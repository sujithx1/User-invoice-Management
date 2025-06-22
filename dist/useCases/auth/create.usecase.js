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
exports.UserCreateuseCase = void 0;
const AppError_1 = require("../../config/AppError");
const hashPass_1 = require("../../config/hashPass");
const helper_1 = require("../../config/helper");
const usermap_1 = require("../../map/usermap");
const types_1 = require("../../types/types");
class UserCreateuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const findemail = yield this.userrep.findByEmail(userData.email);
            if (findemail)
                throw new AppError_1.AppError(types_1.ErrorCodes.Already_exist, types_1.StatusCode.BAD_REQUEST);
            const findName = yield this.userrep.findByName(userData.name);
            if (findName)
                throw new AppError_1.AppError(types_1.ErrorCodes.Already_name_exist, types_1.StatusCode.BAD_REQUEST);
            const userId = `${(0, helper_1.getRoleFirstletter)(userData.role)}${Date.now()}`;
            userData.userId = userId;
            const hash = yield (0, hashPass_1.hashfn)(userData.password);
            const newUser = Object.assign(Object.assign({ id: "" }, userData), { password: hash, isActive: true, TimeZone: userData.TimeZone });
            return (0, usermap_1.UserMap)(yield this.userrep.create(newUser));
        });
    }
}
exports.UserCreateuseCase = UserCreateuseCase;
