import { AppContext } from './app';
import { ChannelContext } from './channel';
import { ChatContext } from './chat';
import { MeetingContext } from './meeting';
import { PageContext } from './page';
import { SharePointSiteContext } from './share-point-site';
import { TeamContext } from './team';
import { UserContext } from './user';

/**
 * Represents structure of the received context message.
 */
export interface Context {
  /**
   * Properties about the current session for your app
   */
  app: AppContext;

  /**
   * Info about the current page context hosting your app
   */
  page: PageContext;

  /**
   * Info about the currently logged in user running the app.
   * If the current user is not logged in/authenticated (e.g. a meeting app running for an anonymously-joined partcipant) this will be `undefined`.
   */
  user?: UserContext;

  /**
   * When running in the context of a Teams channel, provides information about the channel, else `undefined`
   */
  channel?: ChannelContext;

  /**
   * When running in the context of a Teams chat, provides information about the chat, else `undefined`
   */
  chat?: ChatContext;

  /**
   * When running in the context of a Teams meeting, provides information about the meeting, else `undefined`
   */
  meeting?: MeetingContext;

  /**
   * When hosted in SharePoint, this is the [SharePoint PageContext](https://learn.microsoft.com/javascript/api/sp-page-context/pagecontext?view=sp-typescript-latest), else `undefined`
   */
  sharepoint?: any;

  /**
   * When running in Teams for an organization with a tenant, provides information about the SharePoint site associated with the team.
   * Will be `undefined` when not running in Teams for an organization with a tenant.
   */
  sharePointSite?: SharePointSiteContext;

  /**
   * When running in Teams, provides information about the Team context in which your app is running.
   * Will be `undefined` when not running in Teams.
   */
  team?: TeamContext;

  /**
   * When `processActionCommand` activates a dialog, this dialog should automatically fill in some fields with information. This information comes from M365 and is given to `processActionCommand` as `extractedParameters`.
   * App developers need to use these `extractedParameters` in their dialog.
   * They help pre-fill the dialog with necessary information (`dialogParameters`) along with other details.
   * If there's no key/value pairs passed, the object will be empty in the case
   */
  dialogParameters: Record<string, string>;
}
