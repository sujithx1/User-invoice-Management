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
exports.InvoiceController = void 0;
const types_1 = require("../../types/types");
const AppError_1 = require("../../config/AppError");
const invoicereposritory_1 = require("../../infrastructores/repositories/invoicereposritory");
const updateInvoice_1 = require("../../useCases/invoice/updateInvoice");
const deleteinvoiceusecase_1 = require("../../useCases/invoice/deleteinvoiceusecase");
class InvoiceController {
    constructor(createinvoice, getinvoicesbyuserID) {
        this.createinvoice = createinvoice;
        this.getinvoicesbyuserID = getinvoicesbyuserID;
    }
    invoiceCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { invoiceNumber, invoiceDate, invoiceAmount, customerName, customerEmail, description, dueDate, } = req.body;
                if (!userId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Id_Missing, 404));
                const result = yield this.createinvoice.execute({
                    invoiceNumber,
                    invoiceDate: new Date(invoiceDate),
                    invoiceAmount,
                    customerName,
                    customerEmail,
                    description,
                    dueDate,
                    createdBy: userId,
                });
                res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "invoice created", invoice: result });
            }
            catch (err) {
                next(err);
            }
        });
    }
    invoiceUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.params.userId;
                const data = req.body;
                const updated = yield (0, updateInvoice_1.updateInvoiceUseCase)(Object.assign({ id, createdBy: userId }, data), invoicereposritory_1.mongoInvoiceRepository);
                res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "invoice created", invoice: updated });
            }
            catch (err) {
                next(err);
            }
        });
    }
    invoicedelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.params.userId;
                yield (0, deleteinvoiceusecase_1.deleteInvoiceUseCase)(id, userId, invoicereposritory_1.mongoInvoiceRepository);
                res
                    .status(types_1.StatusCode.CREATED)
                    .json({ success: true, message: "invoice created" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getinvoiceByusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                if (!userId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.Id_Missing, 404));
                const invoices = yield this.getinvoicesbyuserID.execute(userId);
                res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "invoices", invoices });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.InvoiceController = InvoiceController;
