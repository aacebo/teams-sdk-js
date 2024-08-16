import { HttpRequest } from '@teams/common/http';
import { Logger } from '@teams/common/logging';
import {
  Activity,
  InvokeActivity,
  Client,
  Resource,
  Token,
  InvokeResponse,
  ConversationReference,
  TokenResponse,
  MessageSendActivity,
  MentionEntity,
} from '@teams/api';

type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface ActivityEventArgs<T extends Activity> {
  readonly activity: T;
  readonly conversation: ConversationReference;
  readonly req: HttpRequest;
  readonly log: Logger;
  readonly api: Client;
  readonly token: Token;
  readonly say: (activity: Partial<Activity>) => Promise<Resource>;
  readonly reply: (id: string, activity: Partial<Activity>) => Promise<Resource>;
  readonly signin: (name: string, text?: string) => Promise<Resource>;
}

export interface Events extends ActivityEvents, InvokeActivityEvents {
  error?: EventHandler<Error>;
  auth?: EventHandler<string>;
  start?: EventHandler<void>;
  'sign-in'?: EventHandler<ActivityEventArgs<Activity> & { readonly tokenResponse: TokenResponse }>;
  mention?: EventHandler<
    ActivityEventArgs<MessageSendActivity> & { readonly mention: MentionEntity }
  >;
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
