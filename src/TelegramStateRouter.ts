import { MessageProvider } from './MessageProvider/MessageProvider';
import { TelegramMessageRequest, TelegramMessageResponse } from './MessageProvider/TelegramMessageResponse';
import { StateRouter } from './State/StateRouter';

export interface HttpResponse {
    statusCode: number;
    json?: object;
}

export class TelegramStateRouter {
    private messageProvider: MessageProvider;
    private stateRouter: StateRouter<any>;

    constructor(messageProvider: MessageProvider, stateRouter: StateRouter<any>) {
        this.messageProvider = messageProvider;
        this.stateRouter = stateRouter;
    }

    async processMessage(message: TelegramMessageRequest): Promise<HttpResponse> {
        console.log('Request message: ', message);

        let responses: TelegramMessageResponse[];
        try {
            responses = await this.stateRouter.doAction(message);
        } catch (error) {
            console.log('Error while doing and action', error);

            responses = [{
                chat_id: message.chat.id,
                text: `Error occurred: ${error}`,
                reply_to_message_id: message.message_id,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }];
        }

        try {
            for (const response of responses) {
                console.log('Response message: ', response.text);
                await this.messageProvider.respond(response);
            }

            return {
                statusCode: 201,
            };
        } catch (error) {
            console.warn('Error', error);

            return {
                statusCode: 400,
                json: {
                    error: `Some error occurred: ${error}`
                }
            };
        }
    }
}
