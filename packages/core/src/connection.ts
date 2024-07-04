import {ActionEntry} from './action.js';
import {InformationEntry} from './information.js';

export type ContextEntry = InformationEntry | ActionEntry;

export interface ActionModelResponse {
    type: 'action';
    name: string;
    arguments: any;
}

export interface MessageChunk {
    content: string;
}

// 模型返回普通文本消息
export interface MessageModelResponse {
    type: 'message';
    stream: AsyncIterableIterator<MessageChunk>;
}

export type ModelResponse = ActionModelResponse | MessageModelResponse;

export abstract class ModelConnection {
    async request(userQuery: string, entries: ContextEntry[]): Promise<ModelResponse> {
        const prompt = await this.getPrompt(userQuery, entries);
        return this.callModel(prompt);
    }

    protected abstract getPrompt(userQuery: string, context: ContextEntry[]): Promise<string>;

    protected abstract callModel(prompt: string): Promise<ModelResponse>;
}
