import { TelegramMessageRequest, TelegramMessageResponse } from '../MessageProvider/TelegramMessageResponse';
import { MongoState, MongoStateData } from '../Mongo/MongoState';
import { MessageResponse, StateResponse } from '../ResponseBuilder';
import { MongoStateProvider } from '../StateProvider/MongoStateProvider';
import { Interceptor } from './Interceptor';
import { State } from './State';
import areEqual from 'fast-deep-equal';

export interface StateRouterConfig<T extends string> {
    interceptors: Interceptor[];
    getInitialState: () => MongoStateData<T>;
    states: {
        [state in T]: State<any, T>;
    };
}

// TODO Common: add debug logs
export class StateRouter<T extends string> {
    private config: StateRouterConfig<T>;
    private stateProvider: MongoStateProvider;

    constructor(config: StateRouterConfig<T>, stateProvider: MongoStateProvider) {
        this.config = config;
        this.stateProvider = stateProvider;
    }

    async doAction(message: TelegramMessageRequest): Promise<TelegramMessageResponse[]> {
        console.log('Before interceptor');
        let interceptorResponse = null;
        for (const interceptor of this.config.interceptors) {
            interceptorResponse = await interceptor(message);

            if (interceptorResponse !== null) {
                return [ interceptorResponse ];
            }
        }
        console.log('Interceptor result - ', interceptorResponse);

        let stage: T;
        let state: MongoState<any>;

        let response: StateResponse<any, T>;
        {
            state = await this.getState(message.chat.id);
            stage = state.stage;
            const statePerformer = this.config.states[stage];
            response = await statePerformer.performAction(message.text, state.data);
        }

        let result: MessageResponse<any>;
        if (response.type === 'redirect') {
            stage = response.stage;
            const statePerformer = this.config.states[stage];
            result = await statePerformer.selectState(response.initialData);

            if (response.replaceMessage) {
                result.messages = [response.replaceMessage];
            }

            if (response.prependedMessage) {
                result.messages.unshift(response.prependedMessage);
            }
        } else {
            result = response;
        }

        const stageChanges = this.getStateChanges(result, stage, message.chat.id);

        // don't save changes if not changed
        if (!areEqual(stageChanges, state)) {
            await this.stateProvider.saveState({ userId: stageChanges.userId }, stageChanges);
        }

        return StateRouter.getMessageResponses(result, message.chat.id);
    }

    private async getState(userId: number): Promise<MongoState<T>> {
        const state = await this.stateProvider.getState(userId);

        if (state && this.config.states[state.stage]) {
            return state;
        }

        return {
            ...this.config.getInitialState(),
            userId,
        };
    }

    private getStateChanges(response: MessageResponse<any>, stage: T, chatId: number): MongoState<T> {
        return {
            userId: chatId,
            stage,
            data: response.data,
        };
    }

    private static getMessageResponses(response: MessageResponse<any>, chatId: number): TelegramMessageResponse[] {
        const result: TelegramMessageResponse[] = [];

        for (const message of response.messages) {
            result.push({
                chat_id: chatId,
                text: message
            });
        }

        if (result.length === 0) {
            console.warn('Error: no messages were responded.');
            return result;
        }

        result[result.length - 1].reply_markup = {
            keyboard: response.replyKeyboard.filter(Boolean).map(text => [{ text }]),
            one_time_keyboard: true,
            resize_keyboard: true,
        };

        if (response.inlineKeyboard && result.length > 1) {
            result[result.length - 2].reply_markup = {
                inline_keyboard: response.inlineKeyboard.map(({ text, query }) => ({
                    switch_inline_query_current_chat: query,
                    text,
                }))
            };
        }

        return result;
    }
}
