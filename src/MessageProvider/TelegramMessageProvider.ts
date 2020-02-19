import { MessageProvider } from './MessageProvider';
import { TelegramMessageResponse } from './TelegramMessageResponse';

const axios = require('axios');

export class TelegramMessageProvider implements MessageProvider {
    respond(response: TelegramMessageResponse): Promise<any> {
        return axios.post(
            'https://api.telegram.org/bot1071083747:AAEBdDMkL_j7AWacabDHzYv6B7n970FP_to/sendMessage',
            response
        );
    }
}
