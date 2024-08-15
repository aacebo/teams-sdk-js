import { Storage } from './storage';

export class LocalStorage<T = any> implements Storage<T> {
  private readonly _store = new Map<string, T>();

  get(key: string) {
    return this._store.get(key);
  }

  set(key: string, value: T) {
    this._store.set(key, value);
  }

  delete(key: string) {
    this._store.delete(key);
  }

  toString() {
    return JSON.stringify(this._store, null, 2);
  }
}
