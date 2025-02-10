import { MessageRequest } from './message';
import {
  BarCodeConfig,
  Context,
  FrameContext,
  HostClientType,
  liveshare,
  marketplace,
  Permission,
  UserMeetingRole,
  UserProfile,
} from './types';
import * as params from './params';

type Optional<T> = T | undefined;
export interface Method<In, Out> {
  readonly in: In;
  readonly out: Out;
}

export type Methods = {
  initialize: Method<void, [FrameContext, HostClientType, string, string]>;
  getContext: Method<void, [Context]>;
  executeDeepLink: Method<[string], void>;
  captureImage: Method<void, void>;

  /**
   * Send a message to the ChildAppWindow.
   */
  messageForChild: Method<[MessageRequest], void>;

  /**
   * Send a message to the ParentAppWindow.
   */
  messageForParent: Method<[MessageRequest], void>;

  /**
   * authentication
   */
  'authentication.authenticate': Method<
    [string, Optional<number>, Optional<number>, Optional<boolean>],
    [string]
  >;
  'authentication.getAuthToken': Method<
    [Optional<Array<string>>, Optional<Array<string>>, Optional<boolean>, Optional<string>],
    [string]
  >;
  'authentication.getUser': Method<void, [UserProfile]>;

  /**
   * permissions
   */
  'permissions.has': Method<Array<Permission>, [boolean]>;
  'permissions.request': Method<Array<Permission>, [boolean]>;

  /**
   * appInstallDialog
   */
  'appInstallDialog.openAppInstallDialog': Method<[params.OpenAppInstallDialogParams], void>;

  /**
   * calendar
   */
  'calendar.openCalendarItem': Method<[params.OpenCalendarItemParams], void>;
  'calendar.composeMeeting': Method<[params.ComposeCalendarMeetingParams], void>;

  /**
   * call
   */
  'call.startCall': Method<[params.StartCallParams], [boolean]>;

  /**
   * chat
   */
  'chat.openChat': Method<[params.OpenChatParams], void>;

  /**
   * clipboard
   */
  'clipboard.readFromClipboard': Method<void, [string | Blob]>;
  'clipboard.writeToClipboard': Method<[params.ClipboardWriteParams], void>;

  /**
   * interactive
   */
  'interactive.getFluidTenantInfo': Method<void, [liveshare.FluidTenant]>;
  'interactive.getFluidToken': Method<[Optional<string>], [string]>;
  'interactive.getFluidContainerId': Method<void, [liveshare.FluidContainer]>;
  'interactive.setFluidContainerId': Method<[string], [liveshare.FluidContainer]>;
  'interactive.getNtpTime': Method<void, [liveshare.NtpTime]>;
  'interactive.registerClientId': Method<[string], [Array<UserMeetingRole>]>;
  'interactive.getClientRoles': Method<[string], [Optional<Array<UserMeetingRole>>]>;
  'interactive.getClientInfo': Method<[string], [Optional<liveshare.ClientInfo>]>;

  /**
   * marketplace
   */
  'marketplace.getCart': Method<[marketplace.CartVersion], [marketplace.Cart]>;
  'marketplace.addOrUpdateCartItems': Method<
    [params.AddOrUpdateCartItemsParams],
    [marketplace.Cart]
  >;
  'marketplace.removeCartItems': Method<[params.RemoveCartItemsParams], [marketplace.Cart]>;
  'marketplace.updateCartStatus': Method<[params.UpdateCartStatusParams], [marketplace.Cart]>;

  /**
   * media
   */
  'media.scanBarCode': Method<[BarCodeConfig], [string]>;
};
