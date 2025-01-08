import { OpenAI } from 'openai';
import { config } from 'dotenv';

// loads environment variables from a .env file into process.env
config();

export class AssistantsHelper {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async createAssistant() {
    const assistant = await this.openai.beta.assistants.create({
      model: 'gpt-4o',
      description: 'A simple assistant',
      instructions:
        'You are a simple assistant that can answer questions related to genral knowledge.',
      name: 'Simple Assistant',
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Determine weather in my location',
            strict: true,
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city and state e.g. San Francisco, CA',
                },
                weather: {
                  type: 'string',
                  description: 'The weather in the location.',
                  enum: ['sunny', 'rainy', 'cloudy', 'snowy'],
                },
              },
              additionalProperties: false,
              required: ['location', 'weather'],
            },
          },
        },
      ],
      top_p: 0.1,
    });

    return assistant.id;
  }

  async createThread() {
    const thread = await this.openai.beta.threads.create();
    return thread.id;
  }
}

(async () => {
  const apiKey = process.env.OPENAI_KEY;
  if (!apiKey) {
    throw new Error('missing OPENAI_KEY');
  }

  const helper = new AssistantsHelper(apiKey);
  const assistantId = await helper.createAssistant();
  const threadId = await helper.createThread();

  console.log(`Assistant ID: ${assistantId}`);
  console.log(`Thread ID: ${threadId}`);
})();
