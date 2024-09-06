import { ChatModel, ChatParams, LocalMemory, Memory, ModelMessage } from '@teams.sdk/ai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import OpenAI from 'openai';
import { Fetch } from 'openai/core.mjs';
import { Stream } from 'openai/streaming';

export interface OpenAIChatModelOptions {
  readonly model: string;
  readonly apiKey?: string;
  readonly baseUrl?: string;
  readonly organization?: string;
  readonly project?: string;
  readonly headers?: { [key: string]: string };
  readonly fetch?: Fetch;
  readonly timeout?: number;
  readonly stream?: boolean;
  readonly temperature?: number;
  readonly logger?: Logger;
}

export class OpenAIChatModel implements ChatModel {
  private readonly _openai: OpenAI;
  private readonly _log: Logger;

  constructor(readonly options: OpenAIChatModelOptions) {
    this._log = options.logger || new ConsoleLogger('@teams.sdk/openai');
    this._openai = new OpenAI({
      apiKey: options.apiKey,
      baseURL: options.baseUrl,
      organization: options.organization,
      project: options.project,
      defaultHeaders: options.headers,
      fetch: options.fetch,
      timeout: options.timeout,
    });
  }

  async chat(
    params: ChatParams,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<ModelMessage> {
    const memory = params.messages || new LocalMemory();
    await memory.push(params.input);

    // call functions
    if (params.input.role === 'model' && params.input.function_calls?.length) {
      for (const call of params.input.function_calls) {
        const fn = (params.functions || {})[call.name];

        if (!fn) {
          throw new Error(`function ${call.name} not found`);
        }

        let content = '';

        try {
          const output = await fn.handler(call.arguments);
          content = JSON.stringify(output);
        } catch (err) {
          this._log.error(err);
        }

        await memory.push({
          role: 'function',
          content,
          function_id: call.id,
        });
      }
    }

    const messages = await memory.values();

    if (params.system) {
      messages.push(params.system);
    }

    try {
      const completion = await this._openai.chat.completions.create({
        model: this.options.model,
        temperature: this.options.temperature,
        stream: this.options.stream,
        tools:
          Object.keys(params.functions || {}).length === 0
            ? undefined
            : Object.values(params.functions || {}).map((fn) => ({
                type: 'function',
                function: {
                  name: fn.name,
                  description: fn.description,
                  parameters: fn.parameters,
                },
              })),
        messages: messages.map((message) => {
          if (message.role === 'model') {
            return {
              role: 'assistant',
              content: message.content,
              tool_calls: message.function_calls?.map((fn) => ({
                id: fn.id,
                type: 'function',
                function: {
                  name: fn.name,
                  arguments: JSON.stringify(fn.arguments),
                },
              })),
            };
          }

          if (message.role === 'function') {
            return {
              role: 'tool',
              content: message.content || '',
              tool_call_id: message.function_id,
            };
          }

          if (message.role === 'user') {
            if (!message.content) {
              message.content = '';
            }

            return {
              role: 'user',
              content:
                typeof message.content === 'string'
                  ? message.content
                  : message.content.map((p) => {
                      if (p.type === 'image_url') {
                        return {
                          type: p.type,
                          image_url: { url: p.image_url },
                        };
                      }

                      return p;
                    }),
            };
          }

          return message;
        }),
      });

      if (!(completion instanceof Stream)) {
        const message = completion.choices[0].message;

        if (message.tool_calls) {
          return this._onTool(params, memory, message, onChunk);
        }

        const res: ModelMessage = {
          role: 'model',
          content: message.content || undefined,
        };

        await memory.push(res);
        return res;
      }

      const message: ModelMessage = {
        role: 'model',
        content: '',
      };

      for await (const chunk of completion) {
        const delta = chunk.choices[0].delta;

        if (delta.tool_calls && delta.tool_calls.length > 0) {
          return this._onTool(params, memory, delta, onChunk);
        }

        if (delta.content) {
          if (message.content) {
            message.content += delta.content;
          } else {
            message.content = delta.content;
          }
        }

        if (onChunk) {
          await onChunk({
            role: 'model',
            content: delta.content || undefined,
          });
        }
      }

      await memory.push(message);
      return message;
    } catch (err) {
      this._log.error(err);
      throw err;
    }
  }

  private async _onTool(
    params: ChatParams,
    memory: Memory,
    message:
      | OpenAI.ChatCompletionMessage
      | OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ) {
    const calls: OpenAI.ChatCompletionMessageToolCall[] = [];

    for (const call of message.tool_calls || []) {
      if ('index' in call) {
        if (call.index === calls.length) {
          calls.push({
            id: '',
            type: 'function',
            function: {
              name: '',
              arguments: '{}',
            },
          });
        }

        if (call.id) {
          calls[call.index].id = call.id;
        }

        if (call.function?.name) {
          calls[call.index].function.name = call.function.name;
        }

        if (call.function?.arguments) {
          calls[call.index].function.arguments = call.function.arguments;
        }
      } else {
        calls.push(call);
      }
    }

    return this.chat(
      {
        functions: params.functions,
        messages: memory,
        system: params.system,
        input: {
          role: 'model',
          content: message.content || undefined,
          function_calls: calls.map((call) => {
            let args = {};

            try {
              args = JSON.parse(call.function.arguments);
            } catch (err) {}

            return {
              id: call.id,
              name: call.function.name,
              arguments: args,
            };
          }),
        },
      },
      onChunk
    );
  }
}
