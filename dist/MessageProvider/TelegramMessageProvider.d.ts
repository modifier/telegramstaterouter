import { MessageProvider } from './MessageProvider';
import { TelegramMessageResponse } from './TelegramMessageResponse';
export declare class TelegramMessageProvider implements MessageProvider {
    respond(response: TelegramMessageResponse): Promise<any>;
}
