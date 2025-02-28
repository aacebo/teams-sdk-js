import { Function, FunctionHandler } from '../function';
import { LocalMemory } from '../local-memory';
import { Memory } from '../memory';
import { ContentPart, Message, SystemMessage, UserMessage } from '../message';
import { ChatModel } from '../models';
import { Schema } from '../schema';
import { Template } from '../template';
import { StringTemplate } from '../templates';

export type ChatPromptOptions<TModelExtraParams extends {}> = {
  readonly model: ChatModel<TModelExtraParams>;
  readonly instructions?: string | Template;
  readonly role?: 'system' | 'user';
  readonly messages?: Message[] | Memory;
} & Partial<Omit<TModelExtraParams, 'model' | 'input' | 'messages' | 'functions'>>;

export class ChatPrompt<TModelExtraParams extends {}> {
  readonly messages: Memory;

  protected readonly _role: 'system' | 'user';
  protected readonly _model: ChatModel<TModelExtraParams>;
  protected readonly _template: Template;
  protected readonly _functions: Record<string, Function> = {};

  constructor(options: ChatPromptOptions<TModelExtraParams>) {
    this._role = options.role || 'system';
    this.messages =
      typeof options.messages === 'object' && !Array.isArray(options.messages)
        ? options.messages
        : new LocalMemory({ messages: options.messages || [] });

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

  async chat(
    inputArgs:
      | string
      | ContentPart[]
      | { input: string | ContentPart[]; extraArgs?: TModelExtraParams },
    onChunk?: (chunk: string) => void | Promise<void>
  ) {
    let input: string | ContentPart[] =
      typeof inputArgs === 'object' && 'input' in inputArgs ? inputArgs.input : inputArgs;
    if (typeof inputArgs === 'string') {
      input = inputArgs.trim();
    }

    let buffer = '';
    let system: SystemMessage | UserMessage | undefined = undefined;
    const prompt = await this._template.render();

    if (prompt) {
      system = {
        role: this._role,
        content: prompt,
      };
    }

    const extraArgs =
      typeof inputArgs === 'object' && 'extraArgs' in inputArgs ? inputArgs.extraArgs : undefined;

    const res = await this._model.chat(
      {
        input: {
          role: 'user',
          content: input,
        },
        system,
        messages: this.messages,
        functions: this._functions,
        ...(extraArgs || ({} as TModelExtraParams)),
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
