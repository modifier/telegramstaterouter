"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = __importStar(require("mongodb"));
class MongoHelper {
    constructor(connectUrl) {
        this.connectUrl = connectUrl;
    }
    getClient() {
        if (this.client) {
            return Promise.resolve(this.client);
        }
        else {
            return this.connect();
        }
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongo.MongoClient.connect(this.connectUrl, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.client = client;
                    resolve(client);
                }
            });
        });
    }
    disconnect() {
        if (this.client) {
            this.client.close();
        }
    }
}
exports.MongoHelper = MongoHelper;
//# sourceMappingURL=MongoHelper.js.map