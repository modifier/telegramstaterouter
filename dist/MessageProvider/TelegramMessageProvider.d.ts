import { MessageProvider } from './MessageProvider';
import { TelegramMessageResponse } from './TelegramMessageResponse';
export declare class TelegramMessageProvider implements MessageProvider {
    private readonly id;
    private readonly token;
    constructor(id: number, token: string);
    respond(response: TelegramMessageResponse): Promise<any>;
}
