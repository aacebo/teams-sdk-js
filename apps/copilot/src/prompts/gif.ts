import { ChatPrompt, ContentPart } from '@teams.sdk/ai';
import { Attachment } from '@teams.sdk/api';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

interface SearchArgs {
  readonly text: string;
  readonly limit?: number;
}

export class GifPrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _log: Logger;

  private _attachments: Attachment[] = [];

  constructor() {
    const log = new ConsoleLogger('@apps/copilot/prompts/gif', {
      level: 'debug',
    });

    this._prompt = new ChatPrompt({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users search for gifs.',
      ].join('\n'),
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        logger: log,
        apiKey: process.env.OPENAI_API_KEY,
      }),
    });

    this._log = log;
    this._prompt.function(
      'search',
      'search for gifs',
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'the text to search for',
          },
          limit: {
            type: 'number',
            description: 'the maximum number of gifs to return',
          },
        },
        required: ['text'],
      },
      this._debug('search', this.search.bind(this))
    );
  }

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
  }

  protected async search({ text, limit }: SearchArgs) {
    const { GiphyFetch } = await import('@giphy/js-fetch-api');
    const giphy = new GiphyFetch(process.env.GIPHY_API_KEY || '');
    const res = await giphy.search(text, { limit, sort: 'relevant' });
    return res.data;
  }

  private _debug(name: string, cb: (args: any) => any | Promise<any>) {
    return async (args: any) => {
      const start = new Date();
      this._log.debug(`${name}...`);
      const res = await cb(args);
      this._log.debug(`${name}: ${Date.now() - start.getTime()}ms`);
      return res;
    };
  }
}
