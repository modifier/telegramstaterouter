import { FilterQuery } from 'mongodb';
import { MongoState } from '../Mongo/MongoState';
import { MongoHelper } from '../Mongo/MongoHelper';

export class MongoStateProvider {
    private helper: MongoHelper;
    private dbName: string;

    constructor(helper: MongoHelper, dbName: string) {
        this.helper = helper;
        this.dbName = dbName;
    }

    async saveState(filter: FilterQuery<MongoState<any>>, state: MongoState<any>): Promise<void> {
        const stateDb = await this.helper.getClient();
        const stateCollection = stateDb.db(this.dbName).collection('state');

        return new Promise((resolve, reject) => {
            try {
                stateCollection.replaceOne(filter, state, { upsert: true });
            } catch (error) {
                reject(error);
            }

            resolve();
        });
    }

    async getState(userId: number): Promise<MongoState<any>> {
        const stateDb = await this.helper.getClient();
        const stateCollection = stateDb.db(this.dbName).collection('state');

        try {
            const state = await stateCollection.findOne({ userId });

            console.log('Recovered state', state);

            return state;
        } catch (error) {
            throw error;
        }
    }
}
