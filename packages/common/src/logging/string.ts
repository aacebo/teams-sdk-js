import { ANSI } from './ansi';

export class String {
  private _value: string = '';

  clear() {
    this._value = '';
    return this;
  }

  append(text: string) {
    this._value += text;
    return;
  }

  reset() {
    this._value += ANSI.Reset;
    return this;
  }

  bold(text: string) {
    this._value += ANSI.Bold + text + ANSI.BoldReset;
    return this;
  }

  italic(text: string) {
    this._value += ANSI.Italic + text + ANSI.ItalicReset;
    return this;
  }

  underline(text: string) {
    this._value += ANSI.Underline + text + ANSI.UnderlineReset;
    return this;
  }

  strike(text: string) {
    this._value += ANSI.Strike + text + ANSI.StrikeReset;
    return this;
  }

  black(text: string) {
    this._value += ANSI.ForegroundBlack + text + ANSI.ForegroundReset;
    return this;
  }

  bgBlack(text: string) {
    this._value += ANSI.BackgroundBlack + text + ANSI.BackgroundReset;
    return this;
  }

  red(text: string) {
    this._value += ANSI.ForegroundRed + text + ANSI.ForegroundReset;
    return this;
  }

  bgRed(text: string) {
    this._value += ANSI.BackgroundRed + text + ANSI.BackgroundReset;
    return this;
  }

  green(text: string) {
    this._value += ANSI.ForegroundGreen + text + ANSI.ForegroundReset;
    return this;
  }

  bgGeen(text: string) {
    this._value += ANSI.BackgroundGreen + text + ANSI.BackgroundReset;
    return this;
  }

  yellow(text: string) {
    this._value += ANSI.ForegroundYellow + text + ANSI.ForegroundReset;
    return this;
  }

  bgYellow(text: string) {
    this._value += ANSI.BackgroundYellow + text + ANSI.BackgroundReset;
    return this;
  }

  blue(text: string) {
    this._value += ANSI.ForegroundBlue + text + ANSI.ForegroundReset;
    return this;
  }

  bgBlue(text: string) {
    this._value += ANSI.BackgroundBlue + text + ANSI.BackgroundReset;
    return this;
  }

  magenta(text: string) {
    this._value += ANSI.ForegroundMagenta + text + ANSI.ForegroundReset;
    return this;
  }

  bgMagenta(text: string) {
    this._value += ANSI.BackgroundMagenta + text + ANSI.BackgroundReset;
    return this;
  }

  cyan(text: string) {
    this._value += ANSI.ForegroundCyan + text + ANSI.ForegroundReset;
    return this;
  }

  bgCyan(text: string) {
    this._value += ANSI.BackgroundCyan + text + ANSI.BackgroundReset;
    return this;
  }

  white(text: string) {
    this._value += ANSI.ForegroundWhite + text + ANSI.ForegroundReset;
    return this;
  }

  bgWhite(text: string) {
    this._value += ANSI.BackgroundWhite + text + ANSI.BackgroundReset;
    return this;
  }

  gray(text: string) {
    this._value += ANSI.ForegroundGray + text + ANSI.ForegroundReset;
    return this;
  }

  default(text: string) {
    this._value += ANSI.ForegroundDefault + text + ANSI.ForegroundReset;
    return this;
  }

  bgDefault(text: string) {
    this._value += ANSI.BackgroundDefault + text + ANSI.BackgroundReset;
    return this;
  }

  toString() {
    return this._value;
  }
}
