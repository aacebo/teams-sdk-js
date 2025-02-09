import * as http from '@teams.sdk/common/http';
import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';

import * as window from './window';
import { Context } from './context';

export interface AppOptions {
  /**
   * logger instance to use
   */
  readonly logger?: Logger;
}

interface AppConnect {
  /**
   * the app id
   */
  readonly id: string;

  /**
   * the app name
   */
  readonly name: {
    readonly short: string;
    readonly full: string;
  };
}

export class App {
  log: Logger;

  /**
   * the app id
   */
  get id() {
    return this._id;
  }
  protected _id?: string;

  /**
   * the app name
   */
  get name() {
    return this._name;
  }
  protected _name?: string;

  /**
   * the app/window context
   */
  get context() {
    if (!this._context) {
      throw new Error('app not connected');
    }

    return this._context;
  }
  protected _context?: Context;

  /**
   * the date/time when the app
   * successfully connected
   */
  get connectedAt() {
    return this._connectedAt;
  }
  protected _connectedAt?: Date;

  readonly options: AppOptions;
  readonly http: http.Client;
  protected client: window.Client;

  constructor(options?: AppOptions) {
    this.options = options || {};
    this.log = options?.logger || new ConsoleLogger('@teams.sdk/client');
    this.http = new http.Client();
    this.client = new window.Client();
  }

  /**
   * connect to the host app
   */
  async connect() {
    if (this.connectedAt) return;

    const res = await this.http.get<AppConnect>('/');
    this._id = res.data.id;
    this._name = res.data.name.short;

    if (this._name) {
      this.log = this.options.logger || new ConsoleLogger(`@teams.sdk/${this._name}`);
    }

    await this.client.call('app.initialize');
    await this.client.call('app.notifySuccess');
    await this.client.call('app.notifyAppLoaded');

    const ctx = await this.client.call('app.getContext');
    this.log.info(ctx);

    this._context = mapContext(ctx);
    this._connectedAt = new Date();
    return this.context;
  }

  /**
   * call a server-side function
   * @param name the unique function name
   * @param args the arguments to send
   * @returns the function response
   */
  async call<T = any>(name: string, ...args: any[]) {
    const res = await this.http.post<T>(`/api/functions/${name}`, args);
    return res.data;
  }
}

function mapContext(ctx: window.Context): Context {
  return {
    app: {
      locale: ctx.locale,
      sessionId: ctx.appSessionId ? ctx.appSessionId : '',
      theme: ctx.theme ? ctx.theme : 'default',
      iconPositionVertical: ctx.appIconPosition,
      osLocaleInfo: ctx.osLocaleInfo,
      parentMessageId: ctx.parentMessageId,
      userClickTime: ctx.userClickTime,
      userClickTimeV2: ctx.userClickTimeV2,
      userFileOpenPreference: ctx.userFileOpenPreference,
      host: {
        name: ctx.hostName ? ctx.hostName : 'Teams',
        clientType: ctx.hostClientType ? ctx.hostClientType : 'web',
        sessionId: ctx.sessionId ? ctx.sessionId : '',
        ringId: ctx.ringId,
      },
      appLaunchId: ctx.appLaunchId,
      appId: ctx.appId,
      manifestVersion: ctx.manifestVersion,
    },
    page: {
      id: ctx.entityId,
      frameContext: ctx.frameContext || 'content',
      subPageId: ctx.subEntityId,
      isFullScreen: ctx.isFullScreen,
      isMultiWindow: ctx.isMultiWindow,
      isBackgroundLoad: ctx.isBackgroundLoad,
      sourceOrigin: ctx.sourceOrigin,
    },
    user: {
      id: ctx.userObjectId ?? '',
      displayName: ctx.userDisplayName,
      isCallingAllowed: ctx.isCallingAllowed,
      isPSTNCallingAllowed: ctx.isPSTNCallingAllowed,
      licenseType: ctx.userLicenseType,
      loginHint: ctx.loginHint,
      userPrincipalName: ctx.userPrincipalName,
      tenant: ctx.tid
        ? {
            id: ctx.tid,
            teamsSku: ctx.tenantSKU,
          }
        : undefined,
    },
    channel: ctx.channelId
      ? {
          id: ctx.channelId,
          displayName: ctx.channelName,
          relativeUrl: ctx.channelRelativeUrl,
          membershipType: ctx.channelType,
          defaultOneNoteSectionId: ctx.defaultOneNoteSectionId,
          ownerGroupId: ctx.hostTeamGroupId,
          ownerTenantId: ctx.hostTeamTenantId,
        }
      : undefined,
    chat: ctx.chatId
      ? {
          id: ctx.chatId,
        }
      : undefined,
    meeting: ctx.meetingId
      ? {
          id: ctx.meetingId,
        }
      : undefined,
    sharepoint: ctx.sharepoint,
    team: ctx.teamId
      ? {
          internalId: ctx.teamId,
          displayName: ctx.teamName,
          type: ctx.teamType ? window.mapTeamType(ctx.teamType) : undefined,
          groupId: ctx.groupId,
          templateId: ctx.teamTemplateId,
          isArchived: ctx.isTeamArchived,
          userRole: ctx.userTeamRole ? window.mapUserTeamRole(ctx.userTeamRole) : undefined,
        }
      : undefined,
    sharePointSite:
      ctx.teamSiteUrl ||
      ctx.teamSiteDomain ||
      ctx.teamSitePath ||
      ctx.mySitePath ||
      ctx.mySiteDomain
        ? {
            teamSiteUrl: ctx.teamSiteUrl,
            teamSiteDomain: ctx.teamSiteDomain,
            teamSitePath: ctx.teamSitePath,
            teamSiteId: ctx.teamSiteId,
            mySitePath: ctx.mySitePath,
            mySiteDomain: ctx.mySiteDomain,
          }
        : undefined,
    dialogParameters: ctx.dialogParameters || {},
  };
}
