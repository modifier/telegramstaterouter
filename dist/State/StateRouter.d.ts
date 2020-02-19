import { TelegramMessageRequest, TelegramMessageResponse } from '../MessageProvider/TelegramMessageResponse';
import { MongoStateData } from '../Mongo/MongoState';
import { MongoStateProvider } from '../StateProvider/MongoStateProvider';
import { Interceptor } from './Interceptor';
import { State } from './State';
export interface StateRouterConfig<T extends string> {
    interceptors: Interceptor[];
    getInitialState: () => MongoStateData<T>;
    states: {
        [state in T]: State<any, T>;
    };
}
export declare class StateRouter<T extends string> {
    private config;
    private stateProvider;
    constructor(config: StateRouterConfig<T>, stateProvider: MongoStateProvider);
    doAction(message: TelegramMessageRequest): Promise<TelegramMessageResponse[]>;
    private getState;
    private getStateChanges;
    private static getMessageResponses;
}
