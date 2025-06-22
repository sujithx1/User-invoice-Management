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
exports.mongoInvoiceRepository = exports.ReturnInvoice = void 0;
const invoicemodel_1 = require("../models/invoicemodel");
const ReturnInvoice = (invoice) => {
    return {
        id: invoice._id.toString(),
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: new Date(invoice.invoiceDate),
        invoiceAmount: invoice.invoiceAmount,
        customerName: invoice.customerName,
        customerEmail: invoice.customerEmail,
        description: invoice.description,
        dueDate: invoice.dueDate ? new Date(invoice.dueDate) : undefined,
        financialYear: invoice.financialYear,
        createdBy: invoice.createdBy
    };
};
exports.ReturnInvoice = ReturnInvoice;
exports.mongoInvoiceRepository = {
    create(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield invoicemodel_1.invoicemodel.create(invoice);
            return (0, exports.ReturnInvoice)(created);
        });
    },
    findByNumberAndFY(invoiceNumber, financialYear) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoicemodel_1.invoicemodel.findOne({ invoiceNumber, financialYear });
            if (!invoices)
                return null;
            return (0, exports.ReturnInvoice)(invoices);
        });
    },
    findByFYAndUser(financialYear, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoicemodel_1.invoicemodel.find({ financialYear, createdBy: userId });
            return invoice.map((item) => (0, exports.ReturnInvoice)(item));
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield invoicemodel_1.invoicemodel.findById(id);
            if (!invoice)
                return null;
            return (0, exports.ReturnInvoice)(invoice);
        });
    },
    update(invoice) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield invoicemodel_1.invoicemodel.findByIdAndUpdate(invoice.id, invoice, {
                new: true,
                runValidators: true,
            }).lean();
            if (!updated)
                throw new Error("Update failed");
            return (0, exports.ReturnInvoice)(updated);
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield invoicemodel_1.invoicemodel.findByIdAndDelete(id);
        });
    },
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoicemodel_1.invoicemodel.find({ createdBy: userId });
            if (!invoices)
                return null;
            return invoices.map((item) => (0, exports.ReturnInvoice)(item));
        });
    },
};
