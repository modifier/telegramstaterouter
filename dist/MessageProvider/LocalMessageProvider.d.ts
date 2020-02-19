import { TelegramMessageResponse } from './TelegramMessageResponse';
import { MessageProvider } from './MessageProvider';
export declare class LocalMessageProvider implements MessageProvider {
    respond(response: TelegramMessageResponse): Promise<any>;
}
