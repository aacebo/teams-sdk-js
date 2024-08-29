import { HttpRequest } from '@teams.sdk/common/http';
import { Logger } from '@teams.sdk/common/logging';
import {
  Activity,
  InvokeActivity,
  Client,
  Resource,
  InvokeResponse,
  ConversationReference,
  TokenResponse,
  MessageSendActivity,
  MentionEntity,
} from '@teams.sdk/api';

import { AppTokens } from './tokens';

type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface ActivityEventArgs<T extends Activity> {
  /**
   * the inbound activity
   */
  readonly activity: T;

  /**
   * the inbound activity conversation reference
   */
  readonly conversation: ConversationReference;

  /**
   * the inbound request
   */
  readonly req: HttpRequest;

  /**
   * the app logger instance
   */
  readonly log: Logger;

  /**
   * the bot api client
   */
  readonly api: Client;

  /**
   * the apps tokens
   */
  readonly tokens: AppTokens;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  readonly say: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * reply to an activity
   * @param id the id of the activity to reply to
   * @param activity activity to send
   */
  readonly reply: (id: string, activity: Partial<Activity>) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  readonly signin: (name: string, text?: string) => Promise<Resource>;
}

export type MentionEventArgs = ActivityEventArgs<MessageSendActivity> & {
  readonly mention: MentionEntity;
};

export type SignInEventArgs = ActivityEventArgs<Activity> & {
  readonly tokenResponse: TokenResponse;
};

export interface Events extends ActivityEvents, InvokeActivityEvents {
  error?: EventHandler<Error>;
  start?: EventHandler<void>;
  signin?: EventHandler<SignInEventArgs>;
  mention?: EventHandler<MentionEventArgs>;
  activity?: EventHandler<ActivityEventArgs<Activity>>;
}

export type ActivityEvents = Prefixed<
  {
    [K in Activity['type']]?: EventHandler<ActivityEventArgs<Extract<Activity, { type: K }>>>;
  },
  'activity.'
>;

export type InvokeActivityEvents = Suffixed<
  Prefixed<
    {
      [K in InvokeActivity['name']]?: EventHandler<
        ActivityEventArgs<Extract<InvokeActivity, { name: K }>>,
        InvokeResponse<K>
      >;
    },
    'activity.invoke['
  >,
  ']'
>;
