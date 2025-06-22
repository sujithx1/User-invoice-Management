"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const types_1 = require("../../types/types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessSecret = process.env.JWT_ACCESS_SECRET;
const Authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(types_1.StatusCode.UNAUTHORIZED).json({ message: 'Token Expired' });
        return;
    }
    jsonwebtoken_1.default.verify(token, accessSecret, (err, user) => {
        if (err) {
            res.status(types_1.StatusCode.FORBIDDEN).json({ message: err });
            return;
        }
        console.log(user);
        next();
    });
};
exports.Authentication = Authentication;
