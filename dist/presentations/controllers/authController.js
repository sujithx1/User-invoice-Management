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
exports.UserController = void 0;
const AppError_1 = require("../../config/AppError");
const types_1 = require("../../types/types");
const jwt_1 = require("../../config/jwt");
class UserController {
    constructor(userlogin, usercreate, userEdit, findallusers, userdelete, finduser) {
        this.userlogin = userlogin;
        this.usercreate = usercreate;
        this.userEdit = userEdit;
        this.findallusers = findallusers;
        this.userdelete = userdelete;
        this.finduser = finduser;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, timezone } = req.body;
                if (!email || !password)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.ValidationError, types_1.StatusCode.BAD_REQUEST));
                if (!timezone || typeof timezone !== "string") {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Missing_TimeZone, types_1.StatusCode.BAD_REQUEST));
                }
                const user = yield this.userlogin.execute(email, password, timezone);
                const payload = {
                    id: user.id,
                    role: user.role,
                    userId: user.userId
                };
                const accessToken = (0, jwt_1.generateAcceToken)(payload);
                const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
                return res.cookie(`${payload.role}_refreshToken`, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                    .status(types_1.StatusCode.OK).json({ success: true, message: "Login Success", user, accessToken });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, email, role, createdBy, TimeZone } = req.body;
                if (!name && typeof name !== "string" || !password && typeof password !== "string" || !email && typeof email !== "string" || !role && typeof role !== "string" || !createdBy && typeof createdBy !== "string" || !TimeZone) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.ValidationError, types_1.StatusCode.BAD_REQUEST));
                }
                const user = yield this.usercreate.execute({ name, email, password, role, createdBy, userId: "", TimeZone });
                return res.status(types_1.StatusCode.CREATED).json({ success: true, message: "User Created", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    userUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, role, TimeZone } = req.body;
                const { id } = req.params;
                if (!id)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Id_Missing, types_1.StatusCode.BAD_REQUEST));
                const user = yield this.userEdit.execute(id, { name, role, TimeZone });
                return res.status(types_1.StatusCode.OK).json({ success: true, message: "User Updated", user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Id_Missing, types_1.StatusCode.BAD_REQUEST));
                yield this.userdelete.execute(id);
                return res.status(types_1.StatusCode.OK).json({ success: true, message: "User deleted" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getallusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.findallusers.execute();
                return res.status(types_1.StatusCode.OK).json({ success: true, message: "Users", users });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                if (!id)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Id_Missing, 404));
                const user = yield this.finduser.execute(id);
                const role = user.role;
                res
                    .clearCookie(`${role}_refreshToken`, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "User logout success" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
