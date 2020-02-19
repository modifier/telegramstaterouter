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
// TODO Common: add debug logs
class StateRouter {
    constructor(config, stateProvider) {
        this.config = config;
        this.stateProvider = stateProvider;
    }
    doAction(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Before interceptor');
            let interceptorResponse = null;
            for (const interceptor of this.config.interceptors) {
                interceptorResponse = yield interceptor(message);
                if (interceptorResponse !== null) {
                    return [interceptorResponse];
                }
            }
            console.log('Interceptor result - ', interceptorResponse);
            let stage;
            let response;
            {
                const state = yield this.getState(message.chat.id);
                stage = state.stage;
                const statePerformer = this.config.states[stage];
                response = yield statePerformer.performAction(message.text, state.data);
            }
            let result;
            if (response.type === 'redirect') {
                stage = response.stage;
                const statePerformer = this.config.states[stage];
                result = yield statePerformer.selectState(response.initialData);
                if (response.replaceMessage) {
                    result.messages = [response.replaceMessage];
                }
                if (response.prependedMessage) {
                    result.messages.unshift(response.prependedMessage);
                }
            }
            else {
                result = response;
            }
            // TODO Performance: don't save changes if not changed
            const stageChanges = this.getStateChanges(result, stage, message.chat.id);
            yield this.stateProvider.saveState({ userId: stageChanges.userId }, stageChanges);
            return StateRouter.getMessageResponses(result, message.chat.id);
        });
    }
    getState(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = yield this.stateProvider.getState(userId);
            if (state && this.config.states[state.stage]) {
                return state;
            }
            return Object.assign(Object.assign({}, this.config.getInitialState()), { userId });
        });
    }
    getStateChanges(response, stage, chatId) {
        return {
            userId: chatId,
            stage,
            data: response.data,
        };
    }
    static getMessageResponses(response, chatId) {
        const result = [];
        for (const message of response.messages) {
            result.push({
                chat_id: chatId,
                text: message
            });
        }
        if (result.length === 0) {
            console.warn('Error: no messages were responded.');
            return result;
        }
        result[result.length - 1].reply_markup = {
            keyboard: response.replyKeyboard.filter(Boolean).map(text => [{ text }]),
            one_time_keyboard: true,
            resize_keyboard: true,
        };
        return result;
    }
}
exports.StateRouter = StateRouter;
//# sourceMappingURL=StateRouter.js.map