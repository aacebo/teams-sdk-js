import { ActivityBase } from '../base';

export interface InstalledActivity extends ActivityBase<ChannelData> {
  readonly type: 'installationUpdate';

  /**
   * install update action
   */
  action: 'add';
}

interface ChannelData {
  settings: {
    /**
     * the channel/conversation where the app was installed
     */
    selectedChannel: {
      /**
       * the channel/conversation id that can be used with the graph api
       */
      id: string;
    };
  };
  /**
   * the tenant where the app was installed
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
