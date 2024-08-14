import { ANSI } from './ansi';
import { Logger, LogLevel } from './logger';

export interface ConsoleLoggerOptions {
  readonly name?: string;
  readonly level?: LogLevel;
}

export class ConsoleLogger implements Logger {
  private readonly _name?: string;
  private readonly _level: LogLevel;
  private readonly _levels = {
    error: 100,
    warn: 200,
    info: 300,
    debug: 400,
  };

  private readonly _colors = {
    error: ANSI.ForegroundRed,
    warn: ANSI.ForegroundYellow,
    info: ANSI.ForegroundCyan,
    debug: ANSI.ForegroundMagenta,
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

    const prefix = [this._colors[level], ANSI.Bold, `[${level.toUpperCase()}]`];

    const name = [this._name || '', ANSI.ForegroundReset, ANSI.BoldReset];

    for (const m of msg) {
      const str = new String(m).split('\n');

      for (const line of str) {
        console[level](prefix.join(''), name.join(''), line);
      }
    }
  }
}
