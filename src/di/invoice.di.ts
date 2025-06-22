import { mongoInvoiceRepository } from "../infrastructores/repositories/invoicereposritory";
import { InvoiceController } from "../presentations/controllers/invoiceController";
import { InvoiceCreateuseCase } from "../useCases/invoice/create";
import { InvoiceGetbyuserIduseCase } from "../useCases/invoice/getinvoicesbyusers";


const invoiceRepo= mongoInvoiceRepository

const createInvoiceusecase=new InvoiceCreateuseCase(invoiceRepo)
const getinvoicesByuserId=new InvoiceGetbyuserIduseCase(invoiceRepo)
export const invoiceController=new InvoiceController(createInvoiceusecase,getinvoicesByuserId)