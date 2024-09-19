import { ChatModel, ChatParams, Message, ModelMessage } from "@teams.sdk/ai";
import { ConsoleLogger, Logger } from "@teams.sdk/common/logging";
import OpenAI from "openai";
import { Fetch } from "openai/core.mjs";
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";

export interface OpenAIAssistantModelOptions {
    readonly apiKey?: string;
    readonly baseUrl?: string;
    readonly organization?: string;
    readonly project?: string;
    readonly headers?: { [key: string]: string };
    readonly fetch?: Fetch;
    readonly timeout?: number;
    // readonly stream?: boolean;
    readonly logger?: Logger;
    readonly assistantId: string;
    readonly threadId: string;
}

export class OpenAIAssistantModel implements ChatModel {
    private readonly _openai: OpenAI;
    private readonly _log: Logger;

    public constructor(readonly options: OpenAIAssistantModelOptions) {
        this._openai = new OpenAI({
            apiKey: options.apiKey,
            baseURL: options.baseUrl,
            organization: options.organization,
            project: options.project,
            defaultHeaders: options.headers,
            fetch: options.fetch,
            timeout: options.timeout
        });

        this._log = options.logger || new ConsoleLogger(`@teams.sdk/openai-assistants/${this.options.assistantId}`);
    }

    async chat(params: ChatParams, _?: (chunk: ModelMessage) => void | Promise<void>): Promise<ModelMessage> {
        const threadId = this.options.threadId
        const assistantId = this.options.assistantId
        
        // Ensure thread exists
        await this._ensureThreadExists(threadId)

        // Get user message
        const input = this._getUserMessage(params.input)

        // Create message and add it to the thread
        const message = await this._createMessage(threadId, input)

        // Create run
        let run = await this._createRun(threadId, assistantId)
        
        // Wait for run status to reach a final state
        while (run.status == 'in_progress' || run.status == 'queued') {
            await this._delay(1000)
            run = await this._pollRun(threadId, run.id);
        }

        // Process terminal run state
        if (run.status == "completed") {
            this._log.info(`Run ${run.id} completed successfully`)

            return {
                role: 'model',
                content: await this._getNewMessagesAsText(message.id),
            }
        } else if (run.status == "requires_action") {
            // TODO: Implement function calling
            this._log.debug(`Run ${run.id} requires action`)

            throw new Error(`Not implemented yet`)
        } else {
            throw new Error(`Run ${run.id} failed with status ${run.status}`)
        }
    }

    /**
     * Gets new messages since the given message id. It essentially gets the messages that the assistant added to the thread.
     * @param threadId the thread id
     * @param messageId the message id
     */
    private async _getNewMessages(messageId: string) {
        const messages = await this._openai.beta.threads.messages.list(this.options.threadId, {
            before: messageId,
            order: 'desc',
        })

        return messages;
    }

    private async _getNewMessagesAsText(messageId: string) {
        const messages = await this._getNewMessages(messageId);
        if (messages.data.length == 0) {
            return ""
        }

        return messages.data.map(message => {
            return message.content
            .filter(part => part.type == 'text')
            .map(part => (part as TextContentBlock).text.value)
            .join('\n')
        }).join('\n') 
    }

    private _getUserMessage(input: Message) {
        const content = input.content
        let text = "" 
        

        if (typeof content === 'string') {
            text = content
        } else if (Array.isArray(content)) {
            text = content.filter(part => part.type === 'text').map(part => part.text).join('\n')
        } else {
            throw new Error(`Unsupported content type: ${typeof content}`)
        }

        return text;
    }

    private async _ensureThreadExists(threadId: string) {
        const thread = await this._openai.beta.threads.retrieve(threadId)
        if (!thread) {
            throw new Error(`Thread ${threadId} not found`)
        }

        return thread;
    }

    private async _createMessage(threadId: string, message: string) {
        return this._openai.beta.threads.messages.create(threadId, {
            role: 'user',
            content: message,
        })
    }

    private async _createRun(threadId: string, assistantId: string) {
        return await this._openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
        })
    }

    private async _pollRun(threadId: string, runId: string) {
        return await this._openai.beta.threads.runs.poll(threadId, runId);
    }

    // TODO: Move it somewhere else
    private async _delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}