export interface KeyboardButton {
    text: string;
}
export interface ReplyKeyboardMarkup {
    keyboard: KeyboardButton[][];
    one_time_keyboard?: boolean;
    resize_keyboard?: boolean;
}
export interface ReplyKeyboardRemove {
    remove_keyboard: true;
}
interface InlineKeyboardButton {
    text: string;
    callback_data?: string;
    url?: string;
}
export interface InlineKeyboardMarkup {
    inline_keyboard: InlineKeyboardButton[][];
}
export declare type ReplyKeyboard = InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove;
export interface TelegramMessageResponse {
    chat_id: number;
    text: string;
    reply_markup?: ReplyKeyboard;
    reply_to_message_id?: number;
    parse_mode?: 'HTML';
    disable_web_page_preview?: boolean;
}
export interface TelegramMessageRequest {
    message_id: number;
    from: {
        id: number;
        is_bot: boolean;
        username: string;
    };
    chat: {
        id: number;
        username: string;
        type: 'private';
    };
    date: number;
    text: string;
}
export {};
