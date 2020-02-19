import { TelegramMessageRequest, TelegramMessageResponse } from '../MessageProvider/TelegramMessageResponse';

export type Interceptor = (message: TelegramMessageRequest) => Promise<TelegramMessageResponse>;
