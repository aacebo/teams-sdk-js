import { Function, FunctionHandler } from '../function';
import { ContentPart, Message, UserMessage } from '../message';
import { ChatModel } from '../models';
import { Schema } from '../schema';
import { Template } from '../template';
import { StringTemplate } from '../templates';

export interface ChatPromptOptions {
  readonly model: ChatModel;
  readonly instructions?: string | Template;
  readonly history?: Message[];
}

export class ChatPrompt {
  readonly history: Message[];

  protected readonly _model: ChatModel;
  protected readonly _template: Template;
  protected readonly _functions: Record<string, Function> = {};

  constructor(options: ChatPromptOptions) {
    this.history = options.history || [];
    this._model = options.model;
    this._template =
      typeof options.instructions !== 'object'
        ? new StringTemplate(options.instructions)
        : options.instructions;
  }

  function(name: string, description: string, handler: FunctionHandler): this;
  function(name: string, description: string, parameters: Schema, handler: FunctionHandler): this;
  function(...args: any[]) {
    const name: string = args[0];
    const description: string = args[1];
    const parameters: Schema | null = args.length === 3 ? null : args[2];
    const handler: FunctionHandler = args[args.length - 1];
    this._functions[name] = {
      name,
      description,
      parameters: parameters || {},
      handler,
    };

    return this;
  }

  async call<A extends { [key: string]: any }, R = any>(name: string, args?: A): Promise<R> {
    const fn = this._functions[name];

    if (!fn) {
      throw new Error(`function "${name}" not found`);
    }

    return await fn.handler(args || {});
  }

  async chat(input: string | ContentPart[], onChunk?: (chunk: string) => void | Promise<void>) {
    if (typeof input === 'string') {
      input = input.trim();
    }

    if (this.history.length === 0) {
      this.history.push({
        role: 'system',
        content: await this._template.render(),
      });
    }

    const message: UserMessage = {
      role: 'user',
      content: input,
    };

    let buffer = '';
    const res = await this._model.chat(
      {
        message,
        history: this.history,
        functions: this._functions,
      },
      async (chunk) => {
        if (!chunk.content || !onChunk) return;
        buffer += chunk.content;

        try {
          await onChunk(buffer);
          buffer = '';
        } catch (err) {
          return;
        }
      }
    );

    return res.content || '';
  }
}
