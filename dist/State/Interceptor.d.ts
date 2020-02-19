import { TelegramMessageRequest, TelegramMessageResponse } from '../MessageProvider/TelegramMessageResponse';
export declare type Interceptor = (message: TelegramMessageRequest) => Promise<TelegramMessageResponse>;
