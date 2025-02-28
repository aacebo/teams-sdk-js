import { Function } from '../function';
import { Memory } from '../memory';
import { Message, ModelMessage, SystemMessage, UserMessage } from '../message';

export type ChatParams<TExtraParams extends {}> = {
  readonly system?: SystemMessage | UserMessage;
  readonly input: Message;
  readonly messages?: Memory;
  readonly functions?: Record<string, Function>;
} & Partial<Omit<TExtraParams, 'system' | 'input' | 'messages' | 'functions'>>;

export interface ChatModel<TExtraParams extends {} = {}> {
  chat(
    params: ChatParams<TExtraParams>,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<ModelMessage>;
}
