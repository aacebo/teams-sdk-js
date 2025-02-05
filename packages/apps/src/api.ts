import { Client, ClientOptions } from '@teams.sdk/common/http';
import * as api from '@teams.sdk/api';
import * as graph from '@teams.sdk/graph';

export class Api extends api.Client {
  /**
   * the graph api client
   */
  graph: graph.Client;

  constructor(serviceUrl: string, options?: Client | ClientOptions) {
    super(serviceUrl, options);
    this.graph = new graph.Client();
  }
}
