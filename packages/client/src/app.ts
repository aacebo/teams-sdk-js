import * as http from '@teams.sdk/common/http';
import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';

import * as window from './window';
import { Context, mapContext } from './context';

export interface AppOptions {
  /**
   * logger instance to use
   */
  readonly logger?: Logger;
}

interface AppConnect {
  /**
   * the app id
   */
  readonly id: string;

  /**
   * the app name
   */
  readonly name: {
    readonly short: string;
    readonly full: string;
  };
}

export class App {
  /**
   * the apps logger
   */
  log: Logger;

  /**
   * the app id
   */
  get id() {
    return this._id;
  }
  protected _id?: string;

  /**
   * the app name
   */
  get name() {
    return this._name;
  }
  protected _name?: string;

  /**
   * the app/window context
   */
  get context() {
    if (!this._context) {
      throw new Error('app not connected');
    }

    return this._context;
  }
  protected _context?: Context;

  /**
   * the date/time when the app
   * successfully connected
   */
  get connectedAt() {
    return this._connectedAt;
  }
  protected _connectedAt?: Date;

  readonly options: AppOptions;
  readonly http: http.Client;

  protected parent: window.Client;
  protected runtime?: window.Runtime;

  constructor(options?: AppOptions) {
    this.options = options || {};
    this.log = options?.logger || new ConsoleLogger('@teams.sdk/client');
    this.http = new http.Client();
    this.parent = new window.Client(this.log);
  }

  /**
   * connect to the host app
   */
  async connect() {
    if (this.connectedAt) {
      return this.context;
    }

    const res = await this.http.get<AppConnect>('/');
    this._id = res.data.id;
    this._name = res.data.name.short;

    if (this._name) {
      this.log = this.options.logger || new ConsoleLogger(`@teams.sdk/${this._name}`);
    }

    const { runtime } = await this.parent.initialize();
    this.runtime = runtime;

    const context = await this.parent.getContext();
    this._context = mapContext(context);

    this._connectedAt = new Date();
    return this.context;
  }

  /**
   * call a server-side function
   * @param name the unique function name
   * @param args the arguments to send
   * @returns the function response
   */
  async call<T = any>(name: string, ...args: any[]) {
    const res = await this.http.post<T>(`/api/functions/${name}`, args);
    return res.data;
  }

  /**
   * get the auth user
   */
  async getUser() {
    const res = await this.parent.authentication.getUser();
    return res;
  }

  /**
   * get the auth users token
   */
  async getUserToken() {
    const token = await this.parent.authentication.getToken();
    return token;
  }

  /**
   * get chat members
   */
  async getChatMembers() {
    const members = await this.parent.conversation.getMembers();
    return members;
  }
}
