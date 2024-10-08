import { Context } from './context';

export type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

export type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

export type RouteHandler<In extends Context<any>, Out = void> = (ctx: In) => Out | Promise<Out>;
export type EventHandler<In, Out = void> = (value: In) => Out | Promise<Out>;
