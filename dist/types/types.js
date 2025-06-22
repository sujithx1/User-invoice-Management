"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    Server_errors: 'Serverside Error',
    password_match: 'Password not matching',
    user_not_found: 'User Not Found',
    Resourse_not_found: 'ResourseNotFound',
    ValidationError: 'Validation Error or missing field',
    Id_Missing: 'Missing Id',
    Missing_TimeZone: "Missing TimeZone",
    Already_exist: "User Email Already Exists",
    Already_name_exist: "User Name Already Exists"
};
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
