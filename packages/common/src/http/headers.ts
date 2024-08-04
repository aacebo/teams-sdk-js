import http from 'http';

export class HttpHeaders {
  readonly entries: http.OutgoingHttpHeaders;

  constructor(headers?: http.OutgoingHttpHeaders) {
    this.entries = headers || {};
  }

  get(key: keyof http.OutgoingHttpHeaders) {
    return this.entries[key];
  }

  set(key: keyof http.OutgoingHttpHeaders, value: string | string[]) {
    this.entries[key] = value;
  }

  add(key: keyof http.OutgoingHttpHeaders, value: string) {
    let entry = this.entries[key];

    if (Array.isArray(entry)) {
      entry.push(value);
    } else {
      entry += ' ' + value;
    }

    this.entries[key] = entry;
  }

  del(key: string) {
    delete this.entries[key];
  }
}
