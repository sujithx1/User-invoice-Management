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
exports.InvoiceCreateuseCase = void 0;
const AppError_1 = require("../../config/AppError");
const financialYearUtil_1 = require("../../utils/financialYearUtil");
class InvoiceCreateuseCase {
    constructor(invoiceRepo) {
        this.invoiceRepo = invoiceRepo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const financialYear = (0, financialYearUtil_1.getFinancialYear)(new Date(input.invoiceDate));
            const existing = yield this.invoiceRepo.findByNumberAndFY(input.invoiceNumber, financialYear);
            if (existing)
                throw new AppError_1.AppError("Invoice number already exists for this financial year");
            // Check invoiceDate is between existing dates
            const invoices = yield this.invoiceRepo.findByFYAndUser(financialYear, input.createdBy);
            if (invoices.length > 0) {
                const sorted = invoices.sort((a, b) => +new Date(a.invoiceDate) - +new Date(b.invoiceDate));
                const minDate = new Date(sorted[0].invoiceDate);
                const maxDate = new Date(sorted[sorted.length - 1].invoiceDate);
                const date = new Date(input.invoiceDate);
                if (date < minDate || date > maxDate) {
                    throw new AppError_1.AppError(`Invoice date must be between ${minDate.toDateString()} and ${maxDate.toDateString()}`);
                }
            }
            const invoice = Object.assign(Object.assign({}, input), { financialYear });
            return yield this.invoiceRepo.create(invoice);
        });
    }
}
exports.InvoiceCreateuseCase = InvoiceCreateuseCase;
