import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { Storage } from '@teams.sdk/common/storage';

import {
  RedisClientOptions,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient,
} from 'redis';

export class RedisStorage<T = any> implements Storage<T> {
  private readonly _log: Logger;
  private readonly _client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  constructor(options?: RedisClientOptions) {
    this._log = new ConsoleLogger('@copilot/redis', { level: 'debug' });
    this._client = createClient(options);
    this._client.on('error', this._onError.bind(this));
    this._client.connect();
  }

  async get(key: string) {
    const res = await this._client.get(key);
    if (!res) return;
    return JSON.parse(res);
  }

  async set(key: string, value: T) {
    await this._client.set(key, JSON.stringify(value));
  }

  async delete(key: string) {
    await this._client.del(key);
  }

  private _onError(err: Error) {
    this._log.error(err);
  }
}
