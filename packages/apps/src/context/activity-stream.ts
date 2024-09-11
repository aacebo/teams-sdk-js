import { Activity, ConversationActivityClient, MessageSendActivity } from '@teams.sdk/api';

/**
 * send an activity as a stream to the client
 */
export class ActivityStream {
  protected seq: number = 1;
  protected activity?: Partial<MessageSendActivity>;
  protected chunks: Partial<Activity>[] = [];
  protected api: ConversationActivityClient;
  protected emit: () => void;

  /**
   * the status of the stream
   */
  get status(): 'open' | 'closed' {
    return !!this.activity ? 'open' : 'closed';
  }

  constructor(api: ConversationActivityClient) {
    this.api = api;
    this.emit = this._debounce(this._flush.bind(this));
  }

  /**
   * send a chunk, opening a new stream if necessary
   * @param chunk the chunk to send
   */
  send(chunk: Partial<MessageSendActivity>) {
    this._merge(this.activity, chunk);
    this.chunks.push({
      ...chunk,
      id: undefined,
      type: 'typing',
      channelData: {
        ...(chunk.channelData || {}),
        streamId: undefined,
        streamType: !!this.activity ? 'streaming' : 'informative',
        streamSequence: this.seq++,
      },
    } as Partial<Activity>);

    this.emit();
  }

  close(chunk?: Partial<MessageSendActivity>) {
    this._merge(this.activity, chunk);
    this.chunks.push({
      ...(chunk || {}),
      id: undefined,
      type: 'message',
      text: this.activity?.text,
      channelData: {
        ...(chunk?.channelData || {}),
        streamId: undefined,
        streamType: 'final',
      },
    } as Partial<Activity>);

    this.emit();
  }

  private _merge(a: any, b: any) {
    if (typeof a !== typeof b) return;
    if (!b) return;
    if (!a) {
      a = b;
    }

    if (typeof a !== 'object') {
      a += b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      a = a.concat(b);
    }

    for (const key in a) {
      this._merge(a[key], b[key]);
    }
  }

  private async _flush() {
    while (this.chunks.length) {
      const chunk = this.chunks.shift();

      if (!chunk || !this.activity) break;

      chunk.id = this.activity?.id;
      chunk.channelData = {
        ...(chunk.channelData || {}),
        streamId: this.activity.id,
      };

      const { id } = await this.api.create(chunk);

      if (!this.activity.id) {
        this.activity.id = id;
      }

      if (chunk.channelData.streamType === 'final') {
        this.activity = undefined;
      }
    }
  }

  private _debounce(cb: () => void | Promise<void>, ms: number = 300) {
    let timer: NodeJS.Timeout | undefined;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        if (timer) {
          clearTimeout(timer);
          timer = undefined;
        }

        await cb();
      }, ms);
    };
  }
}
