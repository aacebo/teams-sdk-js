export type FunctionHandler = (args: { [key: string]: any }) => any | Promise<any>;

export interface Function {
  readonly name: string;
  readonly description: string;
  readonly parameters: { [key: string]: any };
  readonly handler: FunctionHandler;
}

export interface FunctionCall {
  readonly id: string;
  readonly name: string;
  readonly arguments: { [key: string]: any };
}
