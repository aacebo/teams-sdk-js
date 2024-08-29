import { ChatPrompt, ContentPart } from '@teams.sdk/ai';
import { Attachment } from '@teams.sdk/api';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { Client } from '@microsoft/microsoft-graph-client';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from '../state';
import { graph } from '../graph';

interface GetCalendarEventsArgs {
  readonly start: string;
  readonly end: string;
}

interface CreateCalendarEventArgs {
  readonly subject: string;
  readonly body: string;
  readonly start: string;
  readonly end: string;
}

interface DeleteCalendarEventArgs {
  readonly eventId: string;
}

export class CalendarPrompt {
  private readonly _prompt: ChatPrompt;
  private readonly _state: State;
  private readonly _log: Logger;
  private readonly _graph: Client;

  private _attachments: Attachment[] = [];

  constructor(state: State) {
    const log = new ConsoleLogger('@apps/copilot/prompts/calendar', {
      level: 'debug',
    });

    this._prompt = new ChatPrompt({
      instructions: [
        'You are an ai assistant that runs in Microsoft Teams.',
        'You are great at helping users create/update/delete meetings/events in their calendar.',
        'Use the users local timezone.',
      ].join('\n'),
      history: [
        {
          role: 'user',
          content: `my timezone is "${state.user.user?.timezone || 'Pacific Standard Time'}"`,
        },
      ],
      model: new OpenAIChatModel({
        model: 'gpt-4o',
        logger: log,
        apiKey: process.env.OPENAI_API_KEY,
      }),
    });

    this._state = state;
    this._log = log;
    this._graph = graph(state.user.auth?.token || '');

    this._prompt.function(
      'get_date',
      'get the current calendar date',
      this._debug('get_date', this.getDate.bind(this))
    );

    this._prompt.function(
      'get_user',
      'get the user account of the user speaking with you',
      this._debug('get_user', this.getUser.bind(this))
    );

    this._prompt.function(
      'get_user_calendar',
      'get the users calendar events',
      {
        type: 'object',
        properties: {
          start: {
            type: 'string',
            format: 'date-time',
          },
          end: {
            type: 'string',
            format: 'date-time',
          },
        },
        required: ['start', 'end'],
      },
      this._debug('get_user_calendar', this.getUserCalendar.bind(this))
    );

    this._prompt.function(
      'delete_user_calendar_event',
      'delete an event from the users calendar',
      {
        type: 'object',
        properties: {
          eventId: {
            type: 'string',
            description: 'the id of the calendar event',
          },
        },
        required: ['eventId'],
      },
      this._debug('delete_user_calendar_event', this.deleteUserCalendarEvent.bind(this))
    );

    this._prompt.function(
      'create_user_calendar_event',
      'create a new calendar event for the user',
      {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
            description: 'the event subject',
          },
          body: {
            type: 'string',
            description: 'the event body (supports HTML)',
          },
          start: {
            type: 'string',
            format: 'date-time',
            description: 'when the event starts',
          },
          end: {
            type: 'string',
            format: 'date-time',
            description: 'when the event ends',
          },
        },
        required: ['subject', 'body', 'start', 'end'],
      },
      this._debug('create_user_calendar_event', this.createUserCalendarEvent.bind(this))
    );
  }

  async chat(input: string | ContentPart[]) {
    this._attachments = [];
    const text = await this._prompt.chat(input);
    return { text, attachments: this._attachments };
  }

  protected getDate() {
    return new Date().toLocaleDateString();
  }

  protected getUser() {
    return this._state.user.user;
  }

  protected async getUserCalendar({ start, end }: GetCalendarEventsArgs) {
    const startAt = new Date(start);
    const endAt = new Date(end);
    const res: Record<'value', MSGraph.Event[]> = await this._graph
      .api('/me/calendar/calendarView')
      .query({
        startDateTime: startAt.toISOString(),
        endDateTime: endAt.toISOString(),
      })
      .get();

    return res.value;
  }

  protected async deleteUserCalendarEvent({ eventId }: DeleteCalendarEventArgs) {
    await this._graph.api(`/me/calendar/events/${eventId}`).delete();
  }

  protected async createUserCalendarEvent(args: CreateCalendarEventArgs) {
    await this._graph.api('/me/calendar/events').create({
      subject: args.subject,
      body: {
        contentType: 'HTML',
        content: args.body,
      },
      start: {
        dateTime: args.start,
        timezone: this._state.user.user?.timezone || 'Pacific Standard Time',
      },
      end: {
        dateTime: args.end,
        timezone: this._state.user.user?.timezone || 'Pacific Standard Time',
      },
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness',
    });
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
