import { ChatModel, ChatParams, Message, ModelMessage } from '@teams.sdk/ai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import OpenAI from 'openai';
import { Fetch } from 'openai/core.mjs';
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/index.mjs';
import { TextContentBlock } from 'openai/resources/beta/threads/messages.mjs';

export interface OpenAIAssistantModelOptions {
  readonly apiKey?: string;
  readonly baseUrl?: string;
  readonly organization?: string;
  readonly project?: string;
  readonly headers?: { [key: string]: string };
  readonly fetch?: Fetch;
  readonly timeout?: number;
  // readonly stream?: boolean;
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
    _?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<ModelMessage> {
    const threadId = this.options.threadId;
    const assistantId = this.options.assistantId;

    // Ensure thread exists
    await this._ensureThreadExists(threadId);

    // Get user message
    const input = this._getUserMessage(params.input);

    // Create message and add it to the thread
    const message = await this._createMessage(threadId, input);

    // Create run
    let run = await this._createRunAndPoll(threadId, assistantId);

    // Process run
    const response = await this._processRun(run, params, message, threadId);

    return {
      role: 'model',
      content: response,
    };
  }

  private async _processRun(
    run: OpenAI.Beta.Threads.Runs.Run,
    params: ChatParams,
    message: OpenAI.Beta.Threads.Messages.Message,
    threadId: string
  ): Promise<string> {
    switch (run.status) {
      case 'completed':
        this._log.debug(`Run ${run.id} completed successfully`);
        return await this._getNewMessagesAsText(message.id);
      case 'requires_action':
        this._log.debug(`Run ${run.id} requires action`);

        if (!run.required_action) {
          throw new Error('Run requires action but no action is provided');
        }

        const functionCalls = run.required_action.submit_tool_outputs.tool_calls;
        const outputs = await Promise.all(
          functionCalls.map((call) =>
            this._callFunction(call.function.name, call.function.arguments, call.id, params)
          )
        );

        run = await this._submitToolOutputsAndPoll(threadId, run.id, outputs);
        return this._processRun(run, params, message, threadId);
      default:
        throw new Error(`Run ${run.id} failed with status ${run.status}`);
    }
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
}
