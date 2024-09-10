import {
  Activity,
  Attachment,
  ConversationActivityClient,
  MessageSendActivity,
} from '@teams.sdk/api';

/**
 * send an activity as a stream to the client
 */
export class ActivityStream {
  protected id?: string;
  protected seq: number = 1;
  protected text?: string;
  protected attachments: Attachment[] = [];
  protected chunks: Partial<Activity>[] = [];
  protected api: ConversationActivityClient;
  protected emit: () => void;

  /**
   * the status of the stream
   */
  get status(): 'open' | 'closed' {
    return !!this.id ? 'open' : 'closed';
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
    if (chunk.text) {
      this.text = this.text ? this.text + chunk.text : chunk.text;
    }

    this.chunks.push({
      ...chunk,
      id: undefined,
      type: 'typing',
      channelData: {
        ...(chunk.channelData || {}),
        streamId: undefined,
        streamType: !!this.id ? 'streaming' : 'informative',
        streamSequence: this.seq++,
      },
    } as Partial<Activity>);
    this.emit();
  }

  close(chunk?: Partial<MessageSendActivity>) {
    if (chunk?.text) {
      this.text = this.text ? this.text + chunk.text : chunk.text;
    }

    this.chunks.push({
      ...(chunk || {}),
      id: undefined,
      type: 'message',
      text: this.text,
      channelData: {
        ...(chunk?.channelData || {}),
        streamId: undefined,
        streamType: 'final',
      },
    } as Partial<Activity>);
    this.emit();
  }

  private async _flush() {
    while (this.chunks.length) {
      const chunk = this.chunks.shift();

      if (!chunk) break;

      chunk.id = this.id;
      chunk.channelData = {
        ...(chunk.channelData || {}),
        streamId: this.id,
      };

      const { id } = await this.api.create(chunk);

      if (!this.id) {
        this.id = id;
      }

      if (chunk.channelData.streamType === 'final') {
        this.id = undefined;
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
