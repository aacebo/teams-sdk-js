import { Account, ConversationAccount } from '../models';
import { ActivityBuilder } from './base';

describe('ActivityBuilder', () => {
  const user: Account = {
    id: '1',
    name: 'test',
    role: 'user',
  };

  const bot: Account = {
    id: '2',
    name: 'test-bot',
    role: 'bot',
  };

  const chat: ConversationAccount = {
    id: '1',
    conversationType: 'personal',
  };

  it('should build', () => {
    const activity = new ActivityBuilder()
      .id('1')
      .locale('en')
      .from(user)
      .conversation(chat)
      .relatesTo({
        channelId: 'msteams',
        serviceUrl: 'http://localhost',
        bot,
        conversation: chat,
      })
      .recipient(bot)
      .replyToId('3')
      .aiGenerated()
      .feedback()
      .build();

    expect(activity.id).toEqual('1');
    expect(activity.locale).toEqual('en');
    expect(activity.from).toStrictEqual(user);
    expect(activity.conversation).toStrictEqual(chat);
    expect(activity.relatesTo).toStrictEqual({
      channelId: 'msteams',
      serviceUrl: 'http://localhost',
      bot,
      conversation: chat,
    });

    expect(activity.recipient).toEqual(bot);
    expect(activity.replyToId).toEqual('3');
    expect(activity.entities).toStrictEqual([
      {
        type: 'https://schema.org/Message',
        '@type': 'Message',
        '@context': 'https://schema.org',
        additionalType: ['AIGeneratedContent'],
      },
    ]);

    expect(activity.channelData?.feedbackLoopEnabled).toEqual(true);
  });
});
