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
exports.DeletUseruseCase = void 0;
const AppError_1 = require("../../config/AppError");
const types_1 = require("../../types/types");
class DeletUseruseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield this.userrep.findById(id);
            if (!findUser)
                throw new AppError_1.AppError(types_1.ErrorCodes.user_not_found, types_1.StatusCode.NOT_FOUND);
            const update = yield this.userrep.findIdBlock(id);
            if (!update)
                throw new AppError_1.AppError(types_1.ErrorCodes.Server_errors, types_1.StatusCode.INTERNAL_SERVER_ERROR);
            return true;
        });
    }
}
exports.DeletUseruseCase = DeletUseruseCase;
