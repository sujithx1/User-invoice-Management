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
exports.deleteInvoiceUseCase = void 0;
const deleteInvoiceUseCase = (id, userId, repo) => __awaiter(void 0, void 0, void 0, function* () {
    const invoice = yield repo.findById(id);
    if (!invoice)
        throw new Error("Invoice not found");
    if (invoice.createdBy !== userId)
        throw new Error("Unauthorized delete attempt");
    yield repo.delete(id);
});
exports.deleteInvoiceUseCase = deleteInvoiceUseCase;
