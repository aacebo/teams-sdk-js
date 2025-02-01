import { App, HttpPlugin } from '@teams.sdk/apps';
import { ChatPrompt, Message } from '@teams.sdk/ai';
import { LocalStorage } from '@teams.sdk/common/storage';
import { DevtoolsPlugin } from '@teams.sdk/dev';
import { OpenAIChatModel } from '@teams.sdk/openai';

const storage = new LocalStorage<Array<Message>>();
const app = new App({
  storage,
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ stream, activity }) => {
  const prompt = new ChatPrompt({
    messages: storage.get(`${activity.conversation.id}/${activity.from.id}`),
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
      stream: true,
    }),
  });

  await prompt.chat(activity.text, (chunk) => {
    stream.emit(chunk);
  });
});

(async () => {
  await app.start();
})();
