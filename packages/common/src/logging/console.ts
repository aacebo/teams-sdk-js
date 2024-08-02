import { Logger, LogLevel } from './logger';

export interface ConsoleLoggerOptions {
  readonly name?: string;
  readonly level?: LogLevel;
}

export class ConsoleLogger implements Logger {
  private readonly _name?: string;
  private readonly _level: LogLevel;
  private readonly _levels = {
    error: 400,
    warn: 300,
    info: 200,
    debug: 100,
  };

  constructor(options?: ConsoleLoggerOptions) {
    this._name = options?.name;
    this._level = options?.level || 'info';
  }

  error(...msg: any[]) {
    this.log('error', ...msg);
  }

  warn(...msg: any[]) {
    this.log('warn', ...msg);
  }

  info(...msg: any[]) {
    this.log('info', ...msg);
  }

  debug(...msg: any[]) {
    this.log('debug', ...msg);
  }

  log(level: LogLevel, ...msg: any[]) {
    if (this._levels[level] > this._levels[this._level]) {
      return;
    }

    console[level](`[${level.toUpperCase()}]`, this._name || '', ...msg);
  }
}
