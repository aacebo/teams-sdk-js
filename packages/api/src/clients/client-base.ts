import axios from 'axios';

export interface ClientInterceptorParams {
  readonly request: axios.InternalAxiosRequestConfig;
  readonly response: axios.AxiosResponse;
}

export interface ClientInterceptor<T extends keyof ClientInterceptorParams> {
  readonly options?: axios.AxiosInterceptorOptions;
  readonly onSuccess?: (
    value: ClientInterceptorParams[T]
  ) => ClientInterceptorParams[T] | Promise<ClientInterceptorParams[T]>;
  readonly onError?: (error: any) => any;
}

export interface ClientOptions<D = any> extends axios.CreateAxiosDefaults<D> {
  readonly children?: Array<ClientBase>;
  readonly interceptors?: {
    readonly request?: Array<ClientInterceptor<'request'>>;
    readonly response?: Array<ClientInterceptor<'response'>>;
  };
}

export abstract class ClientBase {
  readonly http: axios.AxiosInstance;
  readonly options?: ClientOptions;

  protected children: Array<ClientBase>;
  protected interceptors: Record<
    number,
    Array<{
      readonly index: number;
      readonly id: number;
    }>
  > = {};

  constructor(options?: ClientOptions) {
    this.http = axios.create(options);
    this.options = options;
    this.children = options?.children || [];

    for (const interceptor of options?.interceptors?.request || []) {
      this.use('request', interceptor);
    }

    for (const interceptor of options?.interceptors?.response || []) {
      this.use('response', interceptor);
    }
  }

  use<T extends keyof ClientInterceptorParams>(type: T, interceptor: ClientInterceptor<T>) {
    const id = this.http.interceptors[type].use(
      interceptor.onSuccess as any,
      interceptor.onError,
      interceptor.options
    );

    this.interceptors[id] = [];

    for (let i = 0; i < this.children.length; i++) {
      this.interceptors[id].push({
        index: i,
        id: this.children[i].use(type, interceptor),
      });
    }

    return id;
  }

  eject<T extends keyof ClientInterceptorParams>(type: T, id: number) {
    this.http.interceptors[type].eject(id);

    for (const interceptor of this.interceptors[id]) {
      const child = this.children[interceptor.index];
      child.eject(type, interceptor.id);
    }

    delete this.interceptors[id];
  }

  clear<T extends keyof ClientInterceptorParams>(type: T) {
    this.http.interceptors[type].clear();

    for (const child of this.children) {
      child.clear(type);
    }

    this.interceptors = {};
  }
}
