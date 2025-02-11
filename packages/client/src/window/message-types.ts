import {
  AppEligibilityInfo,
  BarCodeConfig,
  Context,
  dialog,
  FrameContext,
  HostClientType,
  // liveshare,
  // marketplace,
  // Permission,
  ThreadMember,
  // UserMeetingRole,
  UserProfile,
} from './types';
import { ClientError } from './client-error';
import { Runtime } from './runtime';
import * as params from './params';

type MessageType<
  N = any,
  Input extends (...args: any[]) => any[] = any,
  Output extends (args: any[]) => any = any,
> = {
  name: N;
  input?: Input;
  output?: Output;
};

export type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ? T[Key] extends MessageType
      ? `${Key}`
      :
          | `${Key}.${Path<T[Key], Exclude<keyof T[Key], keyof Array<any>>> & string}`
          | `${Key}.${Exclude<keyof T[Key], keyof Array<any>> & string}`
    : never
  : never;

export type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * https://office.visualstudio.com/ISS/_git/metaos-hub-sdk?path=/packages/metaos-hub-sdk/src/Services/constants.ts&version=GBmain
 */
export const MessageTypes = {
  appInitialization: {
    appLoaded: {
      name: 'appInitialization.appLoaded',
      input: (version: string) => {
        return [version];
      },
      output: () => null,
    },
    expectedFailure: {
      name: 'appInitialization.expectedFailure',
      input: (args: params.appInitialization.ExpectedFailureParams) => {
        return [args];
      },
      output: () => null,
    },
    failure: {
      name: 'appInitialization.failure',
      input: (args: params.appInitialization.FailedParams) => {
        return [args];
      },
      output: () => null,
    },
    success: {
      name: 'appInitialization.success',
      input: (version: string) => {
        return [version];
      },
      output: () => null,
    },
  },
  appInstallDialog: {
    openAppInstallDialog: {
      name: 'appInstallDialog.openAppInstallDialog',
      input: (args: params.appInstallDialog.OpenAppInstallDialogParams) => {
        return [args];
      },
      output: ([ok, res]: [boolean, string]) => {
        if (!ok) {
          throw { errorCode: 500, message: res };
        }

        return res;
      },
    },
  },
  authentication: {
    getAuthToken: {
      name: 'authentication.getAuthToken',
      input: (args: params.authentication.AuthTokenRequestParams) => {
        return [args.resources, args.claims, args.silent, args.tenantId];
      },
      output: ([ok, res]: [boolean, string]) => {
        if (!ok) {
          throw { errorCode: 500, message: res };
        }

        return res;
      },
    },
    getUser: {
      name: 'authentication.getUser',
      input: () => [],
      output: ([ok, res]: [boolean, UserProfile | ClientError]) => {
        if (!ok) {
          throw res;
        }

        return res as UserProfile;
      },
    },
    authenticate: {
      name: 'authentication.authenticate',
      input: (args: params.authentication.AuthPopUpParams) => {
        return [args.url, args.width, args.height, args.isExternal];
      },
      output: () => null,
    },
    notifySuccess: {
      name: 'authentication.authenticate.success',
      input: (result?: string) => [result],
      output: () => null,
    },
    notifyFailure: {
      name: 'authentication.authenticate.failure',
      input: (reason?: string) => [reason],
      output: () => null,
    },
  },
  appEntity: {
    selectAppEntity: {
      name: 'appEntity.selectAppEntity',
      input: (threadId: string, categories: string[], subEntityId: string) => [
        threadId,
        categories,
        subEntityId,
      ],
      output: () => null,
    },
  },
  barCode: {
    scanBarCode: {
      name: 'media.scanBarCode',
      input: (config: BarCodeConfig) => [config],
      output: ([err, res]: [ClientError | undefined, string]) => {
        if (err) throw err;
        return res;
      },
    },
  },
  calendar: {
    composeMeeting: {
      name: 'calendar.composeMeeting',
      input: (args: params.calendar.ComposeCalendarMeetingParams) => [args],
      output: () => null,
    },
    openCalendarItem: {
      name: 'calendar.openCalendarItem',
      input: (args: params.calendar.OpenCalendarItemParams) => [args],
      output: () => null,
    },
  },
  call: {
    startCall: {
      name: 'call.startCall',
      input: (args: params.call.StartCallParams) => [args],
      output: ([ok]: [boolean]) => ok,
    },
  },
  chat: {
    openChat: {
      name: 'chat.openChat',
      input: (args: params.chat.OpenChatParams) => [args],
      output: () => null,
    },
  },
  clipboard: {
    writeToClipboard: {
      name: 'clipboard.writeToClipboard',
      input: (args: params.clipboard.ClipboardWriteParams) => [args],
      output: () => null,
    },
    readFromClipboard: {
      name: 'clipboard.readFromClipboard',
      input: () => [],
      output: ([res]: [string | Blob]) => res,
    },
  },
  conversations: {
    openConversation: {
      name: 'conversations.openConversation',
      input: (args: params.conversations.OpenConversationParams) => [args],
      output: () => null,
    },
    closeConversation: {
      name: 'conversations.closeConversation',
      input: () => [],
      output: () => null,
    },
    getChatMembers: {
      name: 'getChatMembers',
      input: () => [],
      output: ([res]: [{ members: Array<ThreadMember> }]) => res,
    },
  },
  copilot: {
    customTelemetry: {
      sendCustomTelemetryData: {
        name: 'copilot.customTelemetry.sendCustomTelemetryData',
        input: (stageNameIdentifier: string, timestamp?: number) => [
          stageNameIdentifier,
          timestamp || Date.now(),
        ],
        output: () => null,
      },
    },
    eligibility: {
      getEligibilityInfo: {
        name: 'copilot.eligibility.getEligibilityInfo',
        input: () => [],
        output: ([res]: [AppEligibilityInfo | ClientError]) => {
          if ('errorCode' in res) throw res;
          return res as AppEligibilityInfo;
        },
      },
    },
  },
  dialogs: {
    open: {
      name: 'tasks.startTask',
      input: (args: params.dialog.DialogParams) => [
        {
          title: args.title,
          height: args.size.height || 'small',
          width: args.size.width || 'small',
          url: 'url' in args ? args.url : undefined,
          fallbackUrl: 'fallbackUrl' in args ? args.fallbackUrl : undefined,
          card: 'card' in args ? args.card : undefined,
          completionBotId: 'completionBotId' in args ? args.completionBotId : undefined,
        } as dialog.DialogInfo,
      ],
      output: ([err, result]: [string | undefined, string | object]) => {
        return { err, result };
      },
    },
    submit: {
      name: 'tasks.completeTask',
      input: (result?: string | object, appIds?: string | string[]) => [
        result,
        appIds ? (Array.isArray(appIds) ? appIds : [appIds]) : [],
      ],
      output: () => null,
    },
    update: {
      resize: {
        name: 'tasks.updateTask',
        input: (size: dialog.DialogSize) => [size],
        output: () => null,
      },
    },
  },
  // externalAppCardActions: {
  //   processActionOpenUrl: 'externalAppCardActions.processActionOpenUrl',
  //   processActionSubmit: 'externalAppCardActions.processActionSubmit',
  // },
  // externalAppCardActionsForCEA: {
  //   processActionOpenUrl: 'externalAppCardActionsForCEA.processActionOpenUrl',
  //   processActionSubmit: 'externalAppCardActionsForCEA.processActionSubmit',
  // },
  // externalAppCommands: {
  //   processActionCommand: 'externalAppCommands.processActionCommand',
  // },
  // externalAppAuthentication: {
  //   authenticateAndResendRequest: 'externalAppAuthentication.authenticateAndResendRequest',
  //   authenticateWithSSO: 'externalAppAuthentication.authenticateWithSSO',
  //   authenticateWithSSOAndResendRequest: 'externalAppAuthentication.authenticateWithSSOAndResendRequest',
  //   authenticateWithOauth2: 'externalAppAuthentication.authenticateWithOauth2',
  //   authenticateWithPowerPlatformConnectorPlugins:
  //     'externalAppAuthentication.authenticateWithPowerPlatformConnectorPlugins',
  // },
  // externalAppAuthenticationForCEA: {
  //   authenticateWithSSO: 'externalAppAuthenticationForCEA.authenticateWithSSO',
  //   authenticateWithOauth: 'externalAppAuthenticationForCEA.authenticateWithOauth',
  //   authenticateAndResendRequest: 'externalAppAuthenticationForCEA.authenticateAndResendRequest',
  //   authenticateWithSSOAndResendRequest: 'externalAppAuthenticationForCEA.authenticateWithSSOAndResendRequest',
  // },
  // files: {
  //   addCloudStorageFolder: 'files.addCloudStorageFolder',
  //   copyMoveFiles: 'files.copyMoveFiles',
  //   deleteCloudStorageFolder: 'files.deleteCloudStorageFolder',
  //   getCloudStorageFolders: 'files.getCloudStorageFolders',
  //   openFilePreview: 'openFilePreview',
  //   getExternalProviders: 'files.getExternalProviders',
  //   openCloudStorageFile: 'files.openCloudStorageFile',
  //   getCloudStorageFolderContents: 'files.getCloudStorageFolderContents',
  // },
  getContext: {
    name: 'getContext',
    input: () => [],
    output: ([context]: [Context]) => context,
  },
  initialize: {
    name: 'initialize',
    input: () => [],
    output: ([context, clientType, runtimeVersion, runtime]: [
      FrameContext,
      HostClientType,
      string,
      string,
    ]) => ({
      context,
      clientType,
      runtimeVersion,
      runtime: JSON.parse(runtime) as Runtime,
    }),
  },
  // hostEntity: {
  //   tab: {
  //     addAndConfigure: 'hostEntity.tab.addAndConfigure',
  //     reconfigure: 'hostEntity.tab.reconfigure',
  //     rename: 'hostEntity.tab.rename',
  //     remove: 'hostEntity.tab.remove',
  //     getAll: 'hostEntity.tab.getAll',
  //   },
  // },
  // location: {
  //   getCurrentLocation: 'location.getLocation',
  //   map: {
  //     showLocation: 'location.showLocation',
  //   },
  // },
  // interactive: {
  //   getFluidTenantInfo: 'interactive.getFluidTenantInfo',
  //   getFluidToken: 'interactive.getFluidToken',
  //   getFluidContainerId: 'interactive.getFluidContainerId',
  //   setFluidContainerId: 'interactive.setFluidContainerId',
  //   getNtpTime: 'interactive.getNtpTime',
  //   registerClientId: 'interactive.registerClientId',
  //   getClientRoles: 'interactive.getClientRoles',
  //   getClientInfo: 'interactive.getClientInfo',
  // },
  // links: {
  //   openLink: 'executeDeepLink',
  // },
  // logs: {
  //   handleAppLog: 'log.receive',
  // },
  // mail: {
  //   composeMail: 'mail.composeMail',
  //   openMailItem: 'mail.openMailItem',
  //   handoff: {
  //     composeMail: 'mail.handoff.composeMail',
  //   },
  // },
  // marketplace: {
  //   getCart: 'marketplace.getCart',
  //   addOrUpdateCartItems: 'marketplace.addOrUpdateCartItems',
  //   removeCartItems: 'marketplace.removeCartItems',
  //   updateCartStatus: 'marketplace.updateCartStatus',
  // },
  // media: {
  //   captureImage: 'captureImage',
  //   getMedia: 'getMedia',
  //   selectMedia: 'selectMedia',
  //   viewImages: 'viewImages',
  // },
  // meeting: {
  //   getAppContentStageSharingCapabilities: 'meeting.getAppContentStageSharingCapabilities',
  //   getAppContentStageSharingState: 'meeting.getAppContentStageSharingState',
  //   getAuthenticationTokenForAnonymousUser: 'meeting.getAuthenticationTokenForAnonymousUser',
  //   getIncomingClientAudioState: 'getIncomingClientAudioState',
  //   getLiveStreamState: 'meeting.getLiveStreamState',
  //   meetingReactionReceived: 'meeting.meetingReactionReceived',
  //   getMeetingDetails: 'meeting.getMeetingDetails',
  //   appShareButton: {
  //     setOptions: 'meeting.appShareButton.setOptions',
  //   },
  //   raiseHandStateChanged: 'meeting.raiseHandStateChanged',
  //   requestStartLiveStreaming: 'meeting.requestStartLiveStreaming',
  //   requestStopLiveStreaming: 'meeting.requestStopLiveStreaming',
  //   audioDeviceSelectionChanged: 'meeting.audioDeviceSelectionChanged',
  //   shareAppContentToStage: 'meeting.shareAppContentToStage',
  //   speakingStateChanged: 'meeting.speakingStateChanged',
  //   stopSharingAppContentToStage: 'meeting.stopSharingAppContentToStage',
  //   toggleIncomingClientAudio: 'toggleIncomingClientAudio',
  //   requestAppAudioHandling: 'meeting.requestAppAudioHandling',
  //   updateMicState: 'meeting.updateMicState',
  //   micStateChanged: 'meeting.micStateChanged',
  //   joinMeeting: 'meeting.joinMeeting',
  // },
  // meetingRoom: {
  //   getPairedMeetingRoomInfo: 'meetingRoom.getPairedMeetingRoomInfo',
  //   sendCommandToPairedMeetingRoom: 'meetingRoom.sendCommandToPairedMeetingRoom',
  // },
  // monetization: {
  //   openPurchaseExperience: 'monetization.openPurchaseExperience',
  // },
  // nestedAppAuth: {
  //   execute: 'nestedAppAuth.execute',
  // },
  // notifications: {
  //   showNotification: 'notifications.showNotification',
  // },
  // otherAppStateChange: {
  //   unregisterInstall: 'otherApp.unregisterInstall',
  //   // notifyInstallCompleted is used by store MetaOs app to notify hubs the installation completed
  //   // The function flow is: MetaOs app -> Notify hub
  //   notifyInstallCompleted: 'otherApp.notifyInstallCompleted',
  // },
  // pages: {
  //   getConfig: 'settings.getSettings',
  //   navigateCrossDomain: 'navigateCrossDomain',
  //   navigateToApp: 'pages.navigateToApp',
  //   returnFocus: 'returnFocus',
  //   setCurrentFrame: 'setFrameContext',
  //   shareDeepLink: 'shareDeepLink',
  //   backStack: {
  //     navigateBack: 'navigateBack',
  //   },
  //   currentApp: {
  //     navigateTo: 'pages.currentApp.navigateTo',
  //     navigateToDefaultPage: 'pages.currentApp.navigateToDefaultPage',
  //   },
  //   tabs: {
  //     getTabInstances: 'getTabInstances',
  //     getMruTabInstances: 'getMruTabInstances',
  //     navigateToTab: 'navigateToTab',
  //   },
  //   config: {
  //     setConfig: 'settings.setSettings',
  //     setValidityState: 'settings.setValidityState',
  //     save: {
  //       success: 'settings.save.success',
  //       failure: 'settings.save.failure',
  //     },
  //     remove: {
  //       success: 'settings.remove.success',
  //       failure: 'settings.remove.failure',
  //     },
  //   },
  //   fullTrust: {
  //     enterFullscreen: 'enterFullscreen',
  //     exitFullscreen: 'exitFullscreen',
  //   },
  // },
  // people: {
  //   selectPeople: 'people.selectPeople',
  // },
  // permissions: {
  //   storageService: {
  //     getPermissionStatus: 'permissions.has',
  //   },
  //   requestUserConsentForPermission: 'permissions.request',
  // },
  // profile: {
  //   showProfile: 'profile.showProfile',
  // },
  // remoteCamera: {
  //   getCapableParticipants: 'remoteCamera.getCapableParticipants',
  //   requestControl: 'remoteCamera.requestControl',
  //   sendControlCommand: 'remoteCamera.sendControlCommand',
  //   terminateSession: 'remoteCamera.terminateSession',
  // },
  // readyToUnload: 'readyToUnload',
  // registerHandler: 'registerHandler',
  // search: {
  //   unregister: 'search.unregister',
  //   closeSearch: 'search.closeSearch',
  // },
  // sharing: {
  //   shareWebContent: 'sharing.shareWebContent',
  //   history: {
  //     getContent: 'sharing.history.getContent',
  //   },
  // },
  // stageView: {
  //   open: 'stageView.open',
  //   self: {
  //     close: 'stageView.self.close',
  //   },
  // },
  // store: {
  //   openFullStore: 'store.openFullStore',
  //   openAppDetail: 'store.openAppDetail',
  //   openInContextStore: 'store.openInContextStore',
  //   openSpecificStore: 'store.openSpecificStore',
  // },
  // teams: {
  //   getTeamChannels: 'teams.getTeamChannels',
  //   refreshSiteUrl: 'teams.refreshSiteUrl',
  //   fullTrust: {
  //     getConfigSetting: 'getConfigSetting',
  //     joinedTeams: {
  //       getUserJoinedTeams: 'getUserJoinedTeams',
  //     },
  //   },
  // },
  // messageChannels: {
  //   telemetry: {
  //     getTelemetryPort: 'messageChannels.telemetry.getTelemetryPort',
  //   },
  //   dataLayer: {
  //     getDataLayerPort: 'messageChannels.dataLayer.getDataLayerPort',
  //   },
  // },
  // thirdPartyCloudStorageService: {
  //   getDragAndDropFiles: 'thirdPartyCloudStorage.getDragAndDropFiles',
  // },
  // video: {
  //   effectParameterChange: 'video.effectParameterChange', // effect change message from host to video app
  //   mediaStream: {
  //     registerForVideoFrame: 'video.mediaStream.registerForVideoFrame',
  //     audioInferenceDiscardStatusChange: 'video.mediaStream.audioInferenceDiscardStatusChange',
  //   },
  //   notifyError: 'video.notifyError',
  //   personalizedEffectsChanged: 'video.personalizedEffectsChanged',
  //   registerForVideoEffect: 'video.registerForVideoEffect',
  //   sharedFrame: {
  //     registerForVideoFrame: 'video.registerForVideoFrame',
  //   },
  //   startVideoExtensibilityVideoStream: 'video.startVideoExtensibilityVideoStream',
  //   videoEffectChanged: 'video.videoEffectChanged', // effect change request message from video app to host
  //   videoEffectReadiness: 'video.videoEffectReadiness',
  //   videoExtensibilityIpcChangedEvent: 'video.videoExtensibilityIpcChangedEvent', // message to the hub to prepare video frames
  //   performance: {
  //     performanceDataGenerated: 'video.performance.performanceDataGenerated',
  //     frameProcessingSlow: 'video.performance.frameProcessingSlow',
  //     firstFrameProcessed: 'video.performance.firstFrameProcessed',
  //     textureStreamAcquired: 'video.performance.textureStreamAcquired',
  //   },
  //   setFrameProcessTimeLimit: 'video.setFrameProcessTimeLimit',
  // },
  // webStorage: {
  //   isWebStorageClearedOnUserLogOut: 'webStorage.isWebStorageClearedOnUserLogOut',
  // },
};
