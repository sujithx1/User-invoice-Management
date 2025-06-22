"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_Connection = () => {
    mongoose_1.default.connect(process.env.MONGO_URL)
        .then(() => console.log('MongoDB connected...'))
        .catch((err) => console.log('MongoDB-error', err));
};
exports.DB_Connection = DB_Connection;
