"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleFirstletter = void 0;
const getRoleFirstletter = (role) => {
    switch (role) {
        case "SUPER_ADMIN":
            return "SA";
        case "ADMIN":
            return "A";
        case "UNIT_MANAGER":
            return "UM";
        case "USER":
            return "U";
        default:
            return "X";
    }
};
exports.getRoleFirstletter = getRoleFirstletter;
