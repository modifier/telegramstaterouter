"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simpleResponse(message, data, replyKeyboard) {
    return {
        data,
        messages: [message],
        replyKeyboard
    };
}
exports.simpleResponse = simpleResponse;
function messageResponse(message, keyboard) {
    return {
        data: {},
        messages: [message],
        replyKeyboard: keyboard
    };
}
exports.messageResponse = messageResponse;
class ResponseBuilder {
    constructor() {
        this.messages = [];
    }
    withData(data) {
        this.data = data;
        return this;
    }
    withKeyboard(replyKeyboard) {
        this.replyKeyboard = replyKeyboard;
        return this;
    }
    withInlineKeyboard(inlineKeyboard) {
        this.inlineKeyboard = inlineKeyboard;
        return this;
    }
    addMessage(message) {
        this.messages.push(message);
        return this;
    }
    toResponse() {
        return {
            data: this.data,
            replyKeyboard: this.replyKeyboard,
            inlineKeyboard: this.inlineKeyboard,
            messages: this.messages,
        };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=ResponseBuilder.js.map