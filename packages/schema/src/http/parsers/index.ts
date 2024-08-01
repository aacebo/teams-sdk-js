import * as json from './json';
import * as text from './text';

export interface Parser {
  input(data: any): string;
  output(data: string): any;
}

export { json, text };
