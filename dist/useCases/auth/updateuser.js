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
exports.UpadteUseruseCase = void 0;
const AppError_1 = require("../../config/AppError");
const helper_1 = require("../../config/helper");
const usermap_1 = require("../../map/usermap");
const types_1 = require("../../types/types");
class UpadteUseruseCase {
    constructor(userRep) {
        this.userRep = userRep;
    }
    execute(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const finduser = yield this.userRep.findById(id);
            if (!finduser)
                throw new AppError_1.AppError(types_1.ErrorCodes.user_not_found, types_1.StatusCode.NOT_FOUND);
            if (userData.role && userData.role !== finduser.role) {
                finduser.role = userData.role;
                const userId = `${(0, helper_1.getRoleFirstletter)(userData.role)}${Date.now()}`;
                finduser.userId = userId;
            }
            finduser.TimeZone = userData.TimeZone;
            const update = yield this.userRep.update(id, finduser);
            if (!update)
                throw new AppError_1.AppError(types_1.ErrorCodes.Server_errors);
            return (0, usermap_1.UserMap)(update);
        });
    }
}
exports.UpadteUseruseCase = UpadteUseruseCase;
