import { CallerType } from './caller';

/**
 * any authorized token
 */
export interface Token {
  /**
   * the app id
   */
  appId: string;

  /**
   * the tenant id
   */
  tenantId?: string;

  /**
   * the service url to send responses to
   */
  serviceUrl: string;

  /**
   * where the activity originated from
   */
  from: CallerType;

  /**
   * the id of the activity sender
   */
  fromId: string;
}
