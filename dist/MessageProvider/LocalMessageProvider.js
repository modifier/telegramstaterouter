"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalMessageProvider {
    respond(response) {
        console.log(JSON.stringify(response));
        return Promise.resolve({});
    }
}
exports.LocalMessageProvider = LocalMessageProvider;
//# sourceMappingURL=LocalMessageProvider.js.map