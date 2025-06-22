"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapInvoiceToResponse = exports.UserMap = void 0;
const UserMap = (user) => {
    return {
        id: user.id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        createdBy: user.createdBy,
        isActive: user.isActive,
        TimeZone: user.TimeZone || "",
        groupId: user.groupId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};
exports.UserMap = UserMap;
const mapInvoiceToResponse = (invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: invoice.invoiceDate.toISOString(), // safe serialization
    invoiceAmount: invoice.invoiceAmount,
    customerName: invoice.customerName || null,
    customerEmail: invoice.customerEmail || null,
    description: invoice.description || null,
    dueDate: invoice.dueDate ? invoice.dueDate.toISOString() : null,
    financialYear: invoice.financialYear,
    createdBy: invoice.createdBy
});
exports.mapInvoiceToResponse = mapInvoiceToResponse;
