import { MessageProvider } from './MessageProvider/MessageProvider';
import { TelegramMessageRequest } from './MessageProvider/TelegramMessageResponse';
import { StateRouter } from './State/StateRouter';
export interface HttpResponse {
    statusCode: number;
    json?: object;
}
export declare class TelegramStateRouter {
    private messageProvider;
    private stateRouter;
    constructor(messageProvider: MessageProvider, stateRouter: StateRouter<any>);
    processMessage(message: TelegramMessageRequest): Promise<HttpResponse>;
}
