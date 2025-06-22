"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceEntity = void 0;
class InvoiceEntity {
    constructor(invoiceNumber, invoiceDate, invoiceAmount, customerName, customerEmail, description, dueDate) {
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.invoiceAmount = invoiceAmount;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.description = description;
        this.dueDate = dueDate;
    }
}
exports.InvoiceEntity = InvoiceEntity;
