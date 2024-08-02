export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface Logger {
  /**
   * Output debug message
   * @param msg any data to log
   */
  debug(...msg: any[]): void;

  /**
   * Output info message
   * @param msg any data to log
   */
  info(...msg: any[]): void;

  /**
   * Output warn message
   * @param msg any data to log
   */
  warn(...msg: any[]): void;

  /**
   * Output error message
   * @param msg any data to log
   */
  error(...msg: any[]): void;

  /**
   * Output log message
   * @param msg any data to log
   */
  log(level: LogLevel, ...msg: any[]): void;
}
