"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinancialYear = void 0;
const getFinancialYear = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return month < 4 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
};
exports.getFinancialYear = getFinancialYear;
