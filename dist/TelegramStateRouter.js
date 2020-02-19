"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TelegramStateRouter {
    constructor(messageProvider, stateRouter) {
        this.messageProvider = messageProvider;
        this.stateRouter = stateRouter;
    }
    processMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Request message: ', message);
            let responses;
            try {
                responses = yield this.stateRouter.doAction(message);
            }
            catch (error) {
                console.log('Error while doing and action', error);
                responses = [{
                        chat_id: message.chat.id,
                        text: `Error occurred: ${error}`,
                        reply_to_message_id: message.message_id,
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    }];
            }
            try {
                for (const response of responses) {
                    console.log('Response message: ', response.text);
                    yield this.messageProvider.respond(response);
                }
                return {
                    statusCode: 201,
                };
            }
            catch (error) {
                console.warn('Error', error);
                return {
                    statusCode: 400,
                    json: {
                        error: `Some error occurred: ${error}`
                    }
                };
            }
        });
    }
}
exports.TelegramStateRouter = TelegramStateRouter;
//# sourceMappingURL=TelegramStateRouter.js.map