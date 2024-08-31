import { ActivityBase } from '../base';

export interface UnInstalledActivity extends ActivityBase<ChannelData> {
  readonly type: 'installationUpdate';

  /**
   * install update action
   */
  action: 'remove';
}

interface ChannelData {
  settings: {
    /**
     * the channel/conversation where the app was uninstalled
     */
    selectedChannel: {
      /**
       * the channel/conversation id that can be used with the graph api
       */
      id: string;
    };
  };
  /**
   * the tenant where the app was uninstalled
   */
  tenant: {
    /**
     * the tenant id
     */
    id: string;
  };
  source: {
    name: string;
  };
}
