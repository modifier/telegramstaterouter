import { MessageResponse, StateResponse } from '../ResponseBuilder';

export interface State<T, Y> {
    performAction(message: string, data: T): Promise<StateResponse<T, Y>>;

    selectState(data: T): Promise<MessageResponse<T>>;
}
