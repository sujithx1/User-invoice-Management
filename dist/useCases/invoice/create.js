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
            const findallinvoice = yield this.invoiceRepo.findByAll();
            console.log(findallinvoice);
            if (!findallinvoice) {
                console.log("zero invoice");
                input.invoiceNumber = 1;
            }
            else {
                const sorted = findallinvoice.sort((a, b) => {
                    var _a, _b;
                    const dateA = new Date((_a = a.createdAt) !== null && _a !== void 0 ? _a : "").getTime();
                    const dateB = new Date((_b = b.createdAt) !== null && _b !== void 0 ? _b : "").getTime();
                    // Handle invalid dates safely
                    if (isNaN(dateA))
                        return 1; // Put invalid date at the end
                    if (isNaN(dateB))
                        return -1;
                    return dateB - dateA; // Descending order (latest first)
                });
                // Get the latest
                const latest = sorted[sorted.length - 1];
                console.log(latest);
                input.invoiceNumber = latest.invoiceNumber + 1;
            }
            //   // Check invoiceDate is between existing dates
            //   const invoices = await this.invoiceRepo.findByFYAndUser(financialYear, input.createdBy)
            //   if (invoices.length > 0) {
            //     const sorted = invoices.sort((a, b) => +new Date(a.invoiceDate) - +new Date(b.invoiceDate))
            //     const minDate = new Date(sorted[0].invoiceDate)
            //     const maxDate = new Date(sorted[sorted.length - 1].invoiceDate)
            //     const date = new Date(input.invoiceDate)
            //     if (date < minDate || date > maxDate) {
            //         console.log(date,minDate,maxDate,'dates error');
            //       throw new AppError(
            //         `Invoice date must be between ${minDate.toDateString()} and ${maxDate.toDateString()}`
            //       )
            //     }
            //   }
            const invoice = Object.assign(Object.assign({}, input), { financialYear });
            return yield this.invoiceRepo.create(invoice);
        });
    }
}
exports.InvoiceCreateuseCase = InvoiceCreateuseCase;
