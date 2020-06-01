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

export type StateResponse<T, Y> = MessageResponse<T> | ChangeStateResponse<Y>;

export function simpleResponse<T>(message: string, data: T, replyKeyboard: string[]): MessageResponse<T> {
    return {
        data,
        messages: [message],
        replyKeyboard
    };
}

export function messageResponse(message: string, keyboard: string[]): MessageResponse<object> {
    return {
        data: {},
        messages: [message],
        replyKeyboard: keyboard
    };
}

export class ResponseBuilder<T> {
    private data: T;
    private replyKeyboard: string[];
    private messages: string[] = [];
    private inlineKeyboard: InlineKeyboardButton[];

    withData(data: T): ResponseBuilder<T> {
        this.data = data;

        return this;
    }

    withKeyboard(replyKeyboard: string[]): ResponseBuilder<T> {
        this.replyKeyboard = replyKeyboard;

        return this;
    }

    withInlineKeyboard(inlineKeyboard: InlineKeyboardButton[]): ResponseBuilder<T> {
        this.inlineKeyboard = inlineKeyboard;

        return this;
    }

    addMessage(message: string): ResponseBuilder<T> {
        this.messages.push(message);

        return this;
    }

    toResponse(): MessageResponse<T> {
        return {
            data: this.data,
            replyKeyboard: this.replyKeyboard,
            inlineKeyboard: this.inlineKeyboard,
            messages: this.messages,
        };
    }
}
