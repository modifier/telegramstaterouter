export interface ChangeStateResponse<Y> {
    type: 'redirect';
    stage: Y;
    initialData: object;
    prependedMessage?: string;
    replaceMessage?: string;
}
interface InlineKeyboardButton {
    text: string;
    query?: string;
    url?: string;
}
export interface MessageResponse<T> {
    type?: 'response';
    data: T;
    replyKeyboard: string[];
    inlineKeyboard?: InlineKeyboardButton[];
    messages: string[];
}
export declare type StateResponse<T, Y> = MessageResponse<T> | ChangeStateResponse<Y>;
export declare function simpleResponse<T>(message: string, data: T, replyKeyboard: string[]): MessageResponse<T>;
export declare function messageResponse(message: string, keyboard: string[]): MessageResponse<object>;
export declare class ResponseBuilder<T> {
    private data;
    private replyKeyboard;
    private messages;
    private inlineKeyboard;
    withData(data: T): ResponseBuilder<T>;
    withKeyboard(replyKeyboard: string[]): ResponseBuilder<T>;
    withInlineKeyboard(inlineKeyboard: InlineKeyboardButton[]): ResponseBuilder<T>;
    addMessage(message: string): ResponseBuilder<T>;
    toResponse(): MessageResponse<T>;
}
export {};
