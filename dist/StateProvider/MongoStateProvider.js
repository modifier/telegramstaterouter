"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class MongoStateProvider {
    constructor(helper, dbName) {
        this.helper = helper;
        this.dbName = dbName;
    }
    saveState(filter, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const stateDb = yield this.helper.getClient();
            const stateCollection = stateDb.db(this.dbName).collection('state');
            return new Promise((resolve, reject) => {
                try {
                    stateCollection.replaceOne(filter, state, { upsert: true });
                }
                catch (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
    getState(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const stateDb = yield this.helper.getClient();
            const stateCollection = stateDb.db(this.dbName).collection('state');
            try {
                const state = yield stateCollection.findOne({ userId });
                console.log('Recovered state', state);
                return state;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MongoStateProvider = MongoStateProvider;
//# sourceMappingURL=MongoStateProvider.js.map