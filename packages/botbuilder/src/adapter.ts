import { HttpReceiver, HttpReceiverEvents, Receiver, ReceiverEvents } from '@teams.sdk/apps';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import {
  TurnContext,
  BotAdapter,
  ResourceResponse,
  Activity,
  ConversationReference,
  ActivityEx,
  ConversationParameters,
  ActivityEventNames,
  InvokeResponse,
  BotCallbackHandlerKey,
  DeliveryModes,
  StatusCodes,
  ActivityTypes,
  INVOKE_RESPONSE_KEY,
} from 'botbuilder-core';

import {
  AuthenticateRequestResult,
  AuthenticationConstants,
  BotFrameworkAuthentication,
  ClaimsIdentity,
  ConnectorClient,
  ConnectorFactory,
  UserTokenClient,
} from 'botframework-connector';

import * as uuid from 'uuid';

export interface TeamsAdapterOptions {
  readonly auth: BotFrameworkAuthentication;
  readonly logger?: Logger;
}

export class TeamsAdapter extends BotAdapter implements Receiver {
  readonly ConnectorFactoryKey = Symbol('ConnectorFactory');
  readonly UserTokenClientKey = Symbol('UserTokenClient');

  private _receiver: HttpReceiver;
  private _events: HttpReceiverEvents = {};

  constructor(readonly options: TeamsAdapterOptions) {
    super();

    this._receiver = new HttpReceiver({
      logger: this.options.logger || new ConsoleLogger('@teams.sdk/app/receiver'),
    });

    this._receiver.on('activity', async (args) => {
      let res = { status: 200 };

      await this.processActivity(
        `Bearer ${args.token.toString()}`,
        args.activity as any,
        async () => {
          if (this._events.activity) {
            res = await this._events.activity(args);
          }
        }
      );

      return res;
    });
  }

  start(port = 3000) {
    return this._receiver.start(port);
  }

  on<Event extends keyof ReceiverEvents>(event: Event, cb: HttpReceiverEvents[Event]) {
    this._events[event] = cb;
    return this;
  }

  /**
   * @inheritdoc
   */
  async sendActivities(context: TurnContext, activities: Partial<Activity>[]) {
    if (!context) {
      throw new TypeError('`context` parameter required');
    }

    if (!activities) {
      throw new TypeError('`activities` parameter required');
    }

    if (!activities.length) {
      throw new Error('Expecting one or more activities, but the array was empty.');
    }

    const responses: ResourceResponse[] = [];

    for (const activity of activities) {
      delete activity.id;
      let response: ResourceResponse | undefined = undefined;

      if (activity.type !== 'trace') {
        const connectorClient = context.turnState.get<ConnectorClient>(this.ConnectorClientKey);
        if (!connectorClient) {
          throw new Error('Unable to extract ConnectorClient from turn context.');
        }

        if (activity.replyToId) {
          response = await connectorClient.conversations.replyToActivity(
            activity.conversation!.id,
            activity.replyToId,
            activity
          );
        } else {
          response = await connectorClient.conversations.sendToConversation(
            activity.conversation!.id,
            activity
          );
        }
      }

      if (!response) {
        response = { id: activity.id ?? '' };
      }

      responses.push(response);
    }

    return responses;
  }

  /**
   * @inheritdoc
   */
  async updateActivity(context: TurnContext, activity: Partial<Activity>) {
    if (!context) {
      throw new TypeError('`context` parameter required');
    }

    if (!activity) {
      throw new TypeError('`activity` parameter required');
    }

    const connectorClient = context.turnState.get<ConnectorClient>(this.ConnectorClientKey);

    if (!connectorClient) {
      throw new Error('Unable to extract ConnectorClient from turn context.');
    }

    const response = await connectorClient.conversations.updateActivity(
      activity.conversation!.id,
      activity.id!,
      activity
    );

    return response?.id ? { id: response.id } : undefined;
  }

  /**
   * @inheritdoc
   */
  async deleteActivity(context: TurnContext, reference: Partial<ConversationReference>) {
    if (!context) {
      throw new TypeError('`context` parameter required');
    }

    if (!reference) {
      throw new TypeError('`reference` parameter required');
    }

    const connectorClient = context.turnState.get<ConnectorClient>(this.ConnectorClientKey);

    if (!connectorClient) {
      throw new Error('Unable to extract ConnectorClient from turn context.');
    }

    await connectorClient.conversations.deleteActivity(
      reference.conversation!.id,
      reference.activityId!
    );
  }

  /**
   * @inheritdoc
   *
   * @deprecated
   */
  async continueConversation(
    _reference: Partial<ConversationReference>,
    _logic: (context: TurnContext) => Promise<void>
  ): Promise<void> {
    throw new Error(
      '`CloudAdapterBase.continueConversation` is deprecated, please use `CloudAdapterBase.continueConversationAsync`'
    );
  }

  /**
   * @internal
   */
  async continueConversationAsync(
    botAppIdOrClaimsIdentity: string | ClaimsIdentity,
    reference: Partial<ConversationReference>,
    logicOrAudience: ((context: TurnContext) => Promise<void>) | string,
    maybeLogic?: (context: TurnContext) => Promise<void>
  ): Promise<void> {
    const botAppId =
      typeof botAppIdOrClaimsIdentity === 'string' ? botAppIdOrClaimsIdentity : undefined;
    const claimsIdentity =
      typeof botAppIdOrClaimsIdentity !== 'string'
        ? botAppIdOrClaimsIdentity
        : this.createClaimsIdentity(botAppId);

    const audience = typeof logicOrAudience === 'string' ? logicOrAudience : undefined;
    const logic = typeof logicOrAudience === 'function' ? logicOrAudience : maybeLogic;

    return this.processProactive(
      claimsIdentity,
      ActivityEx.getContinuationActivity(reference),
      audience,
      logic!
    );
  }

  /**
   * @inheritdoc
   */
  async createConversationAsync(
    botAppId: string,
    channelId: string,
    serviceUrl: string,
    audience: string,
    conversationParameters: ConversationParameters,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<void> {
    if (typeof serviceUrl !== 'string' || !serviceUrl) {
      throw new TypeError('`serviceUrl` must be a non-empty string');
    }

    if (!conversationParameters) throw new TypeError('`conversationParameters` must be defined');
    if (!logic) throw new TypeError('`logic` must be defined');

    // Create a ClaimsIdentity, to create the connector and for adding to the turn context.
    const claimsIdentity = this.createClaimsIdentity(botAppId);
    claimsIdentity.claims.push({
      type: AuthenticationConstants.ServiceUrlClaim,
      value: serviceUrl,
    });

    // Create the connector factory.
    const connectorFactory = this.options.auth.createConnectorFactory(claimsIdentity);

    // Create the connector client to use for outbound requests.
    const connectorClient = await connectorFactory.create(serviceUrl, audience);

    // Make the actual create conversation call using the connector.
    const createConversationResult =
      await connectorClient.conversations.createConversation(conversationParameters);

    // Create the create activity to communicate the results to the application.
    const createActivity = this.createCreateActivity(
      createConversationResult.id,
      channelId,
      serviceUrl,
      conversationParameters
    );

    // Create a UserTokenClient instance for the application to use. (For example, in the OAuthPrompt.)
    const userTokenClient = await this.options.auth.createUserTokenClient(claimsIdentity);

    // Create a turn context and run the pipeline.
    const context = this.createTurnContext(
      createActivity,
      claimsIdentity,
      undefined,
      connectorClient,
      userTokenClient,
      logic,
      connectorFactory
    );

    // Run the pipeline.
    await this.runMiddleware(context, logic);
  }

  private createCreateActivity(
    createdConversationId: string | undefined,
    channelId: string,
    serviceUrl: string,
    conversationParameters: ConversationParameters
  ): Partial<Activity> {
    // Create a conversation update activity to represent the result.
    const activity = ActivityEx.createEventActivity();
    activity.name = ActivityEventNames.CreateConversation;
    activity.channelId = channelId;
    activity.serviceUrl = serviceUrl;
    activity.id = createdConversationId || uuid.v4();
    activity.channelData = conversationParameters.channelData;
    activity.recipient = conversationParameters.bot;
    activity.conversation = {
      conversationType: '',
      id: createdConversationId || uuid.v4(),
      isGroup: conversationParameters.isGroup,
      name: '',
      tenantId: conversationParameters.tenantId,
    };

    return activity;
  }

  /**
   * The implementation for continue conversation.
   *
   * @param claimsIdentity The [ClaimsIdentity](xref:botframework-connector.ClaimsIdentity) for the conversation.
   * @param continuationActivity The continuation [Activity](xref:botframework-schema.Activity) used to create the [TurnContext](xref:botbuilder-core.TurnContext).
   * @param audience The audience for the call.
   * @param logic The function to call for the resulting bot turn.
   * @returns a Promise representing the async operation
   */
  protected async processProactive(
    claimsIdentity: ClaimsIdentity,
    continuationActivity: Partial<Activity>,
    audience: string | undefined,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<void> {
    // Create the connector factory and  the inbound request, extracting parameters and then create a connector for outbound requests.
    const connectorFactory = this.options.auth.createConnectorFactory(claimsIdentity);

    // Create the connector client to use for outbound requests.
    const connectorClient = await connectorFactory.create(
      continuationActivity.serviceUrl!,
      audience
    );

    // Create a UserTokenClient instance for the application to use. (For example, in the OAuthPrompt.)
    const userTokenClient = await this.options.auth.createUserTokenClient(claimsIdentity);

    // Create a turn context and run the pipeline.
    const context = this.createTurnContext(
      continuationActivity,
      claimsIdentity,
      audience,
      connectorClient,
      userTokenClient,
      logic,
      connectorFactory
    );

    // Run the pipeline.
    await this.runMiddleware(context, logic);
  }

  /**
   * The implementation for processing an Activity sent to this bot.
   *
   * @param authHeader The authorization header from the http request.
   * @param activity The [Activity](xref:botframework-schema.Activity) to process.
   * @param logic The function to call for the resulting bot turn.
   * @returns a Promise resolving to an invoke response, or undefined.
   */
  protected processActivity(
    authHeader: string,
    activity: Activity,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<InvokeResponse | undefined>;

  /**
   * The implementation for processing an Activity sent to this bot.
   *
   * @param authenticateRequestResult The [AuthenticateRequestResult](xref:botframework-connector.AuthenticateRequestResult) for this turn.
   * @param activity The [Activity](xref:botframework-schema.Activity) to process.
   * @param logic The function to call for the resulting bot turn.
   * @returns a Promise resolving to an invoke response, or undefined.
   */
  protected processActivity(
    authenticateRequestResult: AuthenticateRequestResult,
    activity: Activity,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<InvokeResponse | undefined>;

  /**
   * @internal
   */
  protected async processActivity(
    authHeaderOrAuthenticateRequestResult: string | AuthenticateRequestResult,
    activity: Activity,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<InvokeResponse | undefined> {
    // Authenticate the inbound request, extracting parameters and create a ConnectorFactory for creating a Connector for outbound requests.
    const authenticateRequestResult =
      typeof authHeaderOrAuthenticateRequestResult === 'string'
        ? await this.options.auth.authenticateRequest(
            activity,
            authHeaderOrAuthenticateRequestResult
          )
        : authHeaderOrAuthenticateRequestResult;

    // Set the callerId on the activity.
    activity.callerId = authenticateRequestResult.callerId || '';

    // Create the connector client to use for outbound requests.
    const connectorClient = await authenticateRequestResult.connectorFactory?.create(
      activity.serviceUrl,
      authenticateRequestResult.audience
    );

    if (!connectorClient) {
      throw new Error('Unable to extract ConnectorClient from turn context.');
    }

    // Create a UserTokenClient instance for the application to use. (For example, it would be used in a sign-in prompt.)
    const userTokenClient = await this.options.auth.createUserTokenClient(
      authenticateRequestResult.claimsIdentity
    );

    // Create a turn context and run the pipeline.
    const context = this.createTurnContext(
      activity,
      authenticateRequestResult.claimsIdentity,
      authenticateRequestResult.audience,
      connectorClient,
      userTokenClient,
      logic,
      authenticateRequestResult.connectorFactory!
    );

    // Run the pipeline.
    await this.runMiddleware(context, logic);

    // If there are any results they will have been left on the TurnContext.
    return this.processTurnResults(context);
  }

  /**
   * This is a helper to create the ClaimsIdentity structure from an appId that will be added to the TurnContext.
   * It is intended for use in proactive and named-pipe scenarios.
   *
   * @param botAppId The bot's application id.
   * @returns a [ClaimsIdentity](xref:botframework-connector.ClaimsIdentity) with the audience and appId claims set to the botAppId.
   */
  protected createClaimsIdentity(botAppId = ''): ClaimsIdentity {
    return new ClaimsIdentity([
      {
        type: AuthenticationConstants.AudienceClaim,
        value: botAppId,
      },
      {
        type: AuthenticationConstants.AppIdClaim,
        value: botAppId,
      },
    ]);
  }

  private createTurnContext(
    activity: Partial<Activity>,
    claimsIdentity: ClaimsIdentity,
    oauthScope: string | undefined,
    connectorClient: ConnectorClient,
    userTokenClient: UserTokenClient,
    logic: (context: TurnContext) => Promise<void>,
    connectorFactory: ConnectorFactory
  ): TurnContext {
    const context = new TurnContext(this, activity);

    context.turnState.set(this.BotIdentityKey, claimsIdentity);
    context.turnState.set(this.ConnectorClientKey, connectorClient);
    context.turnState.set(this.UserTokenClientKey, userTokenClient);

    context.turnState.set(BotCallbackHandlerKey, logic);

    context.turnState.set(this.ConnectorFactoryKey, connectorFactory);
    context.turnState.set(this.OAuthScopeKey, oauthScope);

    return context;
  }

  private processTurnResults(context: TurnContext): InvokeResponse | undefined {
    // Handle ExpectedReplies scenarios where all activities have been buffered and sent back at once in an invoke response.
    if (context.activity.deliveryMode === DeliveryModes.ExpectReplies) {
      return {
        status: StatusCodes.OK,
        body: {
          activities: context.bufferedReplyActivities,
        },
      };
    }

    // Handle Invoke scenarios where the bot will return a specific body and return code.
    if (context.activity.type === ActivityTypes.Invoke) {
      const activityInvokeResponse = context.turnState.get<Activity>(INVOKE_RESPONSE_KEY);
      if (!activityInvokeResponse) {
        return { status: StatusCodes.NOT_IMPLEMENTED };
      }

      return activityInvokeResponse.value;
    }

    // No body to return.
    return undefined;
  }
}
