import { TelegramMessageResponse } from './TelegramMessageResponse';
import { MessageProvider } from './MessageProvider';

export class LocalMessageProvider implements MessageProvider {
    respond(response: TelegramMessageResponse): Promise<any> {
        console.log(JSON.stringify(response));

        return Promise.resolve({});
    }
}
