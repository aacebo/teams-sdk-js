import { Memory } from './memory';
import { Message } from './message';
import { ChatModel } from './models';

export interface LocalMemoryOptions {
  readonly max?: number;
  readonly messages?: Message[];
  readonly collapse?: {
    readonly strategy: 'half' | 'full';
    readonly model: ChatModel;
  };
}

export class LocalMemory implements Memory {
  protected readonly messages: Message[];
  protected readonly options: LocalMemoryOptions;

  constructor(options?: LocalMemoryOptions) {
    this.messages = options?.messages || [];
    this.options = options || {};
  }

  async push(message: Message) {
    this.messages.push(message);
    let len = this.length();

    if (len === (this.options.max || 100)) {
      await this.collapse();
      len = this.length();
    }

    while (
      len > (this.options.max || 100) ||
      (this.messages[0].role === 'model' && this.messages[0].function_calls?.length) ||
      this.messages[0].role === 'function'
    ) {
      const removed = this.pop();

      if (!removed) break;

      len = this.length();

      if (len === 0) break;
    }
  }

  pop() {
    return this.messages.shift();
  }

  values() {
    return this.messages.slice();
  }

  length() {
    return this.messages.length;
  }

  async collapse() {
    if (!this.options.collapse) return;

    let start = 0;
    let end = this.length() - 1;

    if (this.options.collapse.strategy === 'half') {
      end = Math.floor(this.length() / 2) - 1;
    }

    let last = this.messages[end];

    while ((last.role === 'model' && last.function_calls?.length) || last.role === 'function') {
      end++;
      last = this.messages[end];
    }

    const res = await this.options.collapse.model.chat({
      input: {
        role: 'user',
        content: 'summarize this conversation',
      },
      messages: new LocalMemory({
        messages: this.messages.slice(start, end),
      }),
    });

    this.messages.splice(start, end - start, res);
    return res;
  }
}
