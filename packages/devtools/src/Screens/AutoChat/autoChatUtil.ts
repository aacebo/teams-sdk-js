import { ChatPrompt } from '@teams.sdk/ai';
import { OpenAIChatModel } from '@teams.sdk/openai';

const OPENAI_API_KEY = '<REDACTED>';

export class AutoChatPrompt {
  private prompt: ChatPrompt;

  constructor(systemPrompt: string) {
    this.prompt = new ChatPrompt({
      instructions: systemPrompt,
      model: new OpenAIChatModel({
        model: 'gpt-4o-mini',
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
    });
  }

  async chat(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
    // Convert the messages array into a single conversation
    const conversation = messages.map((msg) => msg.content).join('\n');
    return await this.prompt.chat(conversation);
  }

  updateSystemPrompt(newPrompt: string) {
    this.prompt = new ChatPrompt({
      instructions: newPrompt,
      model: new OpenAIChatModel({
        model: 'gpt-4o-mini',
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
    });
  }
}
