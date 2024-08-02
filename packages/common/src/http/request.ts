export interface Request<Body = any> {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  body: Body;
}
