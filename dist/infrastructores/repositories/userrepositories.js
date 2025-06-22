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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const ReturnUser = (user) => {
    return {
        userId: user.userId,
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        groupId: user.groupId,
        isActive: user.isActive,
        createdBy: user.createdBy,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};
class UserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield userModel_1.default.create(user);
            return ReturnUser(userData);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email: email });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findById(id);
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    findByuserId(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ userId: userid });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    updateTimeZone(id, TimeZone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findByIdAndUpdate(id, { $set: { TimeZone: TimeZone } }, { upsert: true, new: true });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ name });
            if (!user)
                return null;
            return ReturnUser(user);
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findByIdAndUpdate(id, { $set: {
                    name: userData.name,
                    userId: userData.userId,
                    role: userData.role
                } }, { upsert: true, new: true });
            return ReturnUser(user);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_1.default.find();
            return users.map((user) => ReturnUser(user));
        });
    }
    findIdBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield userModel_1.default.findByIdAndUpdate(id, { $set: { isActive: false } }, { upsert: true, new: true });
            if (!update)
                return false;
            return true;
        });
    }
}
exports.UserRepository = UserRepository;
