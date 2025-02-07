import * as http from '@teams.sdk/common/http';
import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';

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
  log: Logger;

  /**
   * the app id
   */
  get id() {
    return this._id;
  }
  private _id?: string;

  /**
   * the app name
   */
  get name() {
    return this._name;
  }
  private _name?: string;

  readonly options: AppOptions;
  readonly http: http.Client;

  constructor(options?: AppOptions) {
    this.options = options || {};
    this.log = options?.logger || new ConsoleLogger('@teams.sdk/client');
    this.http = new http.Client();
  }

  /**
   * connect to the host app
   */
  async connect() {
    const res = await this.http.get<AppConnect>('/');
    this._id = res.data.id;
    this._name = res.data.name.short;

    if (this._name) {
      this.log = this.options.logger || new ConsoleLogger(`@teams.sdk/${this._name}`);
    }
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
}
