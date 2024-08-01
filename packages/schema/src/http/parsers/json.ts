export function input(data: any): string {
  return JSON.stringify(data);
}

export function output(data: string): any {
  return JSON.parse(data);
}
