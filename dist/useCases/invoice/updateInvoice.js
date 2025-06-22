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
exports.updateInvoiceUseCase = void 0;
const AppError_1 = require("../../config/AppError");
const types_1 = require("../../types/types");
const financialYearUtil_1 = require("../../utils/financialYearUtil");
const updateInvoiceUseCase = (input, invoiceRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield invoiceRepo.findById(input.id);
    if (!existing)
        throw new Error("Invoice not found");
    if (existing.createdBy !== input.createdBy) {
        throw new Error("Unauthorized to update this invoice");
    }
    const updatedDate = input.invoiceDate ? new Date(input.invoiceDate) : new Date(existing.invoiceDate);
    const financialYear = (0, financialYearUtil_1.getFinancialYear)(updatedDate);
    if (input.invoiceNumber &&
        input.invoiceNumber !== existing.invoiceNumber) {
        const duplicate = yield invoiceRepo.findByNumberAndFY(input.invoiceNumber, financialYear);
        if (duplicate)
            throw new Error("Invoice number already exists for this financial year");
    }
    const updatedInvoice = yield invoiceRepo.update(Object.assign(Object.assign(Object.assign({}, existing), input), { financialYear }));
    if (!updatedInvoice)
        throw new AppError_1.AppError(types_1.ErrorCodes.Server_errors);
    return updatedInvoice;
});
exports.updateInvoiceUseCase = updateInvoiceUseCase;
