import * as mongo from 'mongodb';

export class MongoHelper {
    public client: mongo.MongoClient;
    private readonly connectUrl: string;

    constructor(connectUrl: string) {
        this.connectUrl = connectUrl;
    }

    public getClient(): Promise<mongo.MongoClient> {
        if (this.client) {
            return Promise.resolve(this.client);
        } else {
            return this.connect();
        }
    }

    private connect(): Promise<mongo.MongoClient> {
        return new Promise<any>((resolve, reject) => {
            mongo.MongoClient.connect(this.connectUrl, {useNewUrlParser: true}, (err, client: mongo.MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    this.client = client;
                    resolve(client);
                }
            });
        });
    }

    public disconnect(): void {
        if (this.client) {
            this.client.close();
        }
    }
}
