import OpenAI from 'openai';

import { Context } from '../../context';

export interface CopilotContext extends Context {
  readonly apiKey: string;
  readonly openai: OpenAI;
}
