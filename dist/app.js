"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoconection_1 = require("./config/mongoconection");
const cors_2 = require("./config/cors");
const morgan_1 = __importDefault(require("morgan"));
const errorhandler_1 = require("./presentations/middlewares/errorhandler");
const userrouts_1 = require("./presentations/routes/userrouts");
const app = (0, express_1.default)();
exports.app = app;
(0, mongoconection_1.DB_Connection)();
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded());
app.use((0, morgan_1.default)('dev'));
app.use('/api', userrouts_1.router);
app.use((err, req, res, next) => {
    (0, errorhandler_1.errorHandler)(err, req, res, next);
});
