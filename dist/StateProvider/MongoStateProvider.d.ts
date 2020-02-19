import { FilterQuery } from 'mongodb';
import { MongoState } from '../Mongo/MongoState';
import { MongoHelper } from '../Mongo/MongoHelper';
export declare class MongoStateProvider {
    private helper;
    private dbName;
    constructor(helper: MongoHelper, dbName: string);
    saveState(filter: FilterQuery<MongoState<any>>, state: MongoState<any>): Promise<void>;
    getState(userId: number): Promise<MongoState<any>>;
}
