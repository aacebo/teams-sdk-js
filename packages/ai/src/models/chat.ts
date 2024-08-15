import { Function } from '../function';
import { Message, ModelMessage } from '../message';

export interface ChatParams {
  readonly message: Message;
  readonly history?: Message[];
  readonly functions?: Record<string, Function>;
}

export interface ChatModel {
  chat(
    params: ChatParams,
    onChunk?: (chunk: ModelMessage) => void | Promise<void>
  ): Promise<ModelMessage>;
}
