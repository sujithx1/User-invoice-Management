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
exports.UserLoginuseCase = void 0;
const AppError_1 = require("../../config/AppError");
const hashPass_1 = require("../../config/hashPass");
const usermap_1 = require("../../map/usermap");
const types_1 = require("../../types/types");
class UserLoginuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(email, password, timezone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrep.findByEmail(email);
            if (!user)
                throw new AppError_1.AppError(types_1.ErrorCodes.user_not_found, types_1.StatusCode.NOT_FOUND);
            const update = yield this.userrep.updateTimeZone(user.id, timezone);
            if (!update)
                throw new AppError_1.AppError(types_1.ErrorCodes.Server_errors, types_1.StatusCode.INTERNAL_SERVER_ERROR);
            const passwordCheck = yield (0, hashPass_1.comparePass)(password, user.password);
            if (!passwordCheck)
                throw new AppError_1.AppError(types_1.ErrorCodes.password_match, types_1.StatusCode.NOT_FOUND);
            user.TimeZone = timezone;
            return (0, usermap_1.UserMap)(user);
        });
    }
}
exports.UserLoginuseCase = UserLoginuseCase;
