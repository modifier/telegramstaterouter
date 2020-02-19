"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
class TelegramMessageProvider {
    constructor(id, token) {
        this.id = id;
        this.token = token;
    }
    respond(response) {
        return axios.post(`https://api.telegram.org/bot${this.id}:${this.token}/sendMessage`, response);
    }
}
exports.TelegramMessageProvider = TelegramMessageProvider;
//# sourceMappingURL=TelegramMessageProvider.js.map