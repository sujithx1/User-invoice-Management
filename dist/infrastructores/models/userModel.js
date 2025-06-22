"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN", "UNIT_MANAGER", "USER"],
        required: true,
    },
    createdBy: { type: String, required: true },
    groupId: { type: String },
    isActive: { type: Boolean, default: true },
    TimeZone: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", userSchema);
