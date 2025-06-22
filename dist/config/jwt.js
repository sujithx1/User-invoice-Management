"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatenewAccessToken = exports.generateRefreshToken = exports.generateAcceToken = void 0;
const types_1 = require("../types/types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecrect = process.env.JWT_REFRESH_SECRET;
const generateAcceToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, accessSecret, { expiresIn: "2h" });
};
exports.generateAcceToken = generateAcceToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, refreshSecrect, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
const generatenewAccessToken = (req, res) => {
    const { role } = req.params;
    const userRole = `${role}_refreshToken`;
    const refreshToken = req.cookies[userRole];
    if (!refreshToken) {
        return res
            .status(types_1.StatusCode.UNAUTHORIZED)
            .json({ message: "Refresh Token not found" });
    }
    jsonwebtoken_1.default.verify(refreshToken, refreshSecrect, (err, decode) => {
        if (err || !decode) {
            return res
                .status(types_1.StatusCode.FORBIDDEN)
                .json({ message: "Invalid Refresh Token" });
        }
        const user = decode;
        console.log(user);
        const newAccessToken = (0, exports.generateAcceToken)(user);
        return res.json({ accessToken: newAccessToken });
    });
};
exports.generatenewAccessToken = generatenewAccessToken;
