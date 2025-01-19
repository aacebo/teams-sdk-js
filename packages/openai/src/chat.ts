import { ChatModel, ChatParams, LocalMemory, ModelMessage } from '@teams.sdk/ai';
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
    this._log = options.logger || new ConsoleLogger(`@teams.sdk/openai/${this.options.model}`);
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
          this._log.debug(`calling tool "${call.name}"`, call.arguments);
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

      let message: OpenAI.Chat.ChatCompletionMessage = {
        role: 'assistant',
        content: '',
        refusal: null,
      };

      if (!(completion instanceof Stream)) {
        message = completion.choices[0].message;
      } else {
        for await (const chunk of completion) {
          const delta = chunk.choices[0].delta;

          if (delta.tool_calls) {
            if (!message.tool_calls) {
              message.tool_calls = [];
            }

            for (const call of delta.tool_calls) {
              if ('index' in call) {
                if (call.index === message.tool_calls.length) {
                  message.tool_calls.push({
                    id: '',
                    type: 'function',
                    function: {
                      name: '',
                      arguments: '',
                    },
                  });
                }

                if (call.id) {
                  message.tool_calls[call.index].id += call.id;
                }

                if (call.function?.name) {
                  message.tool_calls[call.index].function.name += call.function.name;
                }

                if (call.function?.arguments) {
                  message.tool_calls[call.index].function.arguments += call.function.arguments;
                }
              } else {
                message.tool_calls.push(call);
              }
            }
          }

          if (delta.content) {
            if (message.content) {
              message.content += delta.content;
            } else {
              message.content = delta.content;
            }

            if (onChunk) {
              await onChunk({
                role: 'model',
                content: delta.content,
              });
            }
          }
        }
      }

      const modelMessage: ModelMessage = {
        role: 'model',
        content: message.content || undefined,
        function_calls: message.tool_calls?.map(call => ({
          id: call.id,
          name: call.function.name,
          arguments: JSON.parse(call.function.arguments || '{}'),
        }))
      };

      if (message.tool_calls && message.tool_calls.length > 0) {
        return this.chat({
          ...params,
          input: modelMessage,
          messages: memory,
        }, onChunk);
      }

      await memory.push(modelMessage);
      return modelMessage;
    } catch (err) {
      this._log.error(err);
      throw err;
    }
  }
}
