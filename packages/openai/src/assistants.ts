import { ChatModel, ChatParams, Message, ModelMessage } from '@teams.sdk/ai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import OpenAI from 'openai';
import { Fetch } from 'openai/core.mjs';
import { AssistantStream } from 'openai/lib/AssistantStream.mjs';
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/index.mjs';
import { TextContentBlock, TextDelta } from 'openai/resources/beta/threads/messages.mjs';

export interface OpenAIAssistantModelOptions {
  readonly apiKey?: string;
  readonly baseUrl?: string;
  readonly organization?: string;
  readonly project?: string;
  readonly headers?: { [key: string]: string };
  readonly fetch?: Fetch;
  readonly timeout?: number;
  readonly stream?: boolean;
  readonly logger?: Logger;
  readonly assistantId: string;
  readonly threadId: string;
}

export class OpenAIAssistantModel implements ChatModel {
  private readonly _openai: OpenAI;
  private readonly _log: Logger;

  public constructor(readonly options: OpenAIAssistantModelOptions) {
    this._openai = new OpenAI({
      apiKey: options.apiKey,
      baseURL: options.baseUrl,
      organization: options.organization,
      project: options.project,
      defaultHeaders: options.headers,
      fetch: options.fetch,
      timeout: options.timeout,
    });

    this._log =
      options.logger ||
      new ConsoleLogger(`@teams.sdk/openai-assistants/${this.options.assistantId}`);
  }

  async chat(
    params: ChatParams,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<ModelMessage> {
    const threadId = this.options.threadId;
    const assistantId = this.options.assistantId;

    // Ensure thread exists
    await this._ensureThreadExists(threadId);

    // Get user message
    const input = this._getUserMessage(params.input);

    // Create message and add it to the thread
    const message = await this._createMessage(threadId, input);

    if (this.options.stream) {
      // Stream the run
      if (!onChunk) {
        throw new Error('onChunk callback is required when streaming');
      }

      let run = this._createRunAndStream(threadId, assistantId);
      this._registerStreamEvents(run, onChunk);
      // Wait until run has reached terminal state
      let finalRun = await run.finalRun();
      const response = await this._processRun(finalRun, params, message, threadId, onChunk);
      return {
        role: 'model',
        content: response,
      };
    } else {
      // Create run and poll it
      let run = await this._createRunAndPoll(threadId, assistantId);
      const response = await this._processRun(run, params, message, threadId);
      return {
        role: 'model',
        content: response,
      };
    }
  }

  /**
   * If `onChunk` is passed then the response will be streamed to the callback.
   */
  private async _processRun(
    run: OpenAI.Beta.Threads.Runs.Run,
    params: ChatParams,
    message: OpenAI.Beta.Threads.Messages.Message,
    threadId: string,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<string> {
    switch (run.status) {
      case 'completed':
        return await this._getNewMessagesAsText(message.id);
      case 'requires_action':
        this._log.debug(`Run ${run.id} requires action.`);

        if (!run.required_action) {
          throw new Error('Run requires action but no action is provided');
        }

        const functionCalls = run.required_action.submit_tool_outputs.tool_calls;
        const outputs = await Promise.all(
          functionCalls.map((call) => {
            this._log.debug(`Calling function \`${call.function.name}\``);

            return this._callFunction(call.function.name, call.function.arguments, call.id, params);
          })
        );

        if (onChunk) {
          // Stream the run to the callback
          const submitOutputsRun = this._submitToolOutputsStream(threadId, run.id, outputs);
          this._registerStreamEvents(submitOutputsRun, onChunk);

          // Wait until run has reached terminal state
          run = await submitOutputsRun.finalRun();
          return this._processRun(run, params, message, threadId, onChunk);
        } else {
          // Submit tool and poll the run
          run = await this._submitToolOutputsAndPoll(threadId, run.id, outputs);
          return this._processRun(run, params, message, threadId);
        }
      default:
        throw new Error(`Run ${run.id} failed with status ${run.status}`);
    }
  }

  private async _registerStreamEvents(
    run: AssistantStream,
    onChunk: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<void> {
    run.on('textDelta', (textDelta: TextDelta) =>
      onChunk({ role: 'model', content: textDelta.value })
    );
  }

  private async _callFunction(name: string, args: any, callId: string, params: ChatParams) {
    const fn = (params.functions || {})[name];
    if (!fn) {
      throw new Error(`function ${name} not found`);
    }

    let content = '';
    try {
      const output = await fn.handler(args);
      content = JSON.stringify(output);
    } catch (err) {
      this._log.error(err);
    }

    return {
      output: content,
      tool_call_id: callId,
    } as RunSubmitToolOutputsParams.ToolOutput;
  }

  private async _submitToolOutputsAndPoll(
    threadId: string,
    runId: string,
    toolOutputs: RunSubmitToolOutputsParams.ToolOutput[]
  ) {
    return await this._openai.beta.threads.runs.submitToolOutputsAndPoll(threadId, runId, {
      tool_outputs: toolOutputs,
    });
  }

  private _submitToolOutputsStream(
    threadId: string,
    runId: string,
    toolOutputs: RunSubmitToolOutputsParams.ToolOutput[]
  ) {
    return this._openai.beta.threads.runs.submitToolOutputsStream(threadId, runId, {
      tool_outputs: toolOutputs,
    });
  }

  /**
   * Gets new messages since the given message id. It essentially gets the messages that the assistant added to the thread.
   * @param threadId the thread id
   * @param messageId the message id
   */
  private async _getNewMessages(messageId: string) {
    const messages = await this._openai.beta.threads.messages.list(this.options.threadId, {
      before: messageId,
      order: 'desc',
    });

    return messages;
  }

  private async _getNewMessagesAsText(messageId: string) {
    const messages = await this._getNewMessages(messageId);
    if (messages.data.length == 0) {
      return '';
    }

    return messages.data
      .map((message) => {
        return message.content
          .filter((part) => part.type == 'text')
          .map((part) => (part as TextContentBlock).text.value)
          .join('\n');
      })
      .join('\n');
  }

  private _getUserMessage(input: Message) {
    const content = input.content;
    let text = '';

    if (typeof content === 'string') {
      text = content;
    } else if (Array.isArray(content)) {
      text = content
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('\n');
    } else {
      throw new Error(`Unsupported content type: ${typeof content}`);
    }

    return text;
  }

  private async _ensureThreadExists(threadId: string) {
    const thread = await this._openai.beta.threads.retrieve(threadId);
    if (!thread) {
      throw new Error(`Thread ${threadId} not found`);
    }

    return thread;
  }

  private async _createMessage(threadId: string, message: string) {
    return this._openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });
  }

  private async _createRunAndPoll(threadId: string, assistantId: string) {
    return await this._openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });
  }

  private _createRunAndStream(threadId: string, assistantId: string) {
    return this._openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });
  }
}
