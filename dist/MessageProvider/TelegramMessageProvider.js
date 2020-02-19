"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
class TelegramMessageProvider {
    respond(response) {
        return axios.post('https://api.telegram.org/bot1071083747:AAEBdDMkL_j7AWacabDHzYv6B7n970FP_to/sendMessage', response);
    }
}
exports.TelegramMessageProvider = TelegramMessageProvider;
//# sourceMappingURL=TelegramMessageProvider.js.map