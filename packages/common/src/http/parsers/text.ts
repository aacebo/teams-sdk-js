export function input(data: any): string {
  return Buffer.from(data).toString();
}

export function output(data: string): any {
  return data;
}
