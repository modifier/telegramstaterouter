import * as mongo from 'mongodb';
export declare class MongoHelper {
    client: mongo.MongoClient;
    private readonly connectUrl;
    constructor(connectUrl: string);
    getClient(): Promise<mongo.MongoClient>;
    private connect;
    disconnect(): void;
}
