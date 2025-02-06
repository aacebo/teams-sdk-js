import * as http from '@teams.sdk/common/http';
import * as api from '@teams.sdk/api';
import * as graph from '@teams.sdk/graph';

export class AppClient extends api.Client {
  /**
   * user graph api client
   */
  graph: graph.Client;

  constructor(serviceUrl: string, app: http.Client, user: http.Client) {
    super(serviceUrl, app);
    this.graph = new graph.Client(user);
  }
}

export class UserClient extends graph.Client {}
