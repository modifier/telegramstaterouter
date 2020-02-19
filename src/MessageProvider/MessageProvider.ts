import { TelegramMessageResponse } from './TelegramMessageResponse';

export interface MessageProvider {
    respond(response: TelegramMessageResponse): Promise<any>;
}
