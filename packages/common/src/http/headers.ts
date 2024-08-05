import http from 'http';

export class HttpHeaders {
  readonly entries: http.OutgoingHttpHeaders;

  constructor(headers?: http.OutgoingHttpHeaders) {
    this.entries = headers || {};
  }

  get(key: keyof http.OutgoingHttpHeaders) {
    return this.entries[key];
  }

  set(key: keyof http.OutgoingHttpHeaders, value: string) {
    this.entries[key] = value;
  }

  add(key: keyof http.OutgoingHttpHeaders, value: string) {
    let entry: string | number | string[] = this.entries[key] || '';
    const isArray = Array.isArray(entry);

    if (!Array.isArray(entry)) {
      entry = entry.toString().split(' ');
    }

    entry = Array.from(new Set(entry).add(value));
    this.entries[key] = isArray ? entry : entry.join(' ');
  }

  del(key: string) {
    delete this.entries[key];
  }
}
