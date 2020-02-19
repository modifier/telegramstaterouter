import { MessageProvider } from './MessageProvider';
import { TelegramMessageResponse } from './TelegramMessageResponse';

const axios = require('axios');

export class TelegramMessageProvider implements MessageProvider {
    private readonly id: number;
    private readonly token: string;

    constructor(id: number, token: string) {
        this.id = id;
        this.token = token;
    }

    respond(response: TelegramMessageResponse): Promise<any> {
        return axios.post(
            `https://api.telegram.org/bot${this.id}:${this.token}/sendMessage`,
            response
        );
    }
}
