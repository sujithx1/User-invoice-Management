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
exports.GetAllusersuseCase = void 0;
const usermap_1 = require("../../map/usermap");
class GetAllusersuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userrep.findAll();
            console.log(users);
            return users.length ? users.map((user) => (0, usermap_1.UserMap)(user)) : [];
        });
    }
}
exports.GetAllusersuseCase = GetAllusersuseCase;
