import { AppError } from "../../config/AppError";
import { Invoice } from "../../domain/entities/invoiceentity";
import { InvoiceRepository } from "../../domain/interfaces/repositories/IInvoiceRepositories";
import { getFinancialYear } from "../../utils/financialYearUtil";

interface CreateInvoiceInput extends Omit<Invoice, "financialYear"> {}

export class InvoiceCreateuseCase{
    constructor(   
        private   invoiceRepo: InvoiceRepository

) {
        
    }



    async execute(input: CreateInvoiceInput):Promise<Invoice>{


          const financialYear = getFinancialYear(new Date(input.invoiceDate))
        const existing = await this.invoiceRepo.findByNumberAndFY(input.invoiceNumber, financialYear)
  if (existing) throw new AppError("Invoice number already exists for this financial year")

  // Check invoiceDate is between existing dates
  const invoices = await this.invoiceRepo.findByFYAndUser(financialYear, input.createdBy)
  
  if (invoices.length > 0) {
    const sorted = invoices.sort((a, b) => +new Date(a.invoiceDate) - +new Date(b.invoiceDate))
    const minDate = new Date(sorted[0].invoiceDate)
    const maxDate = new Date(sorted[sorted.length - 1].invoiceDate)

    const date = new Date(input.invoiceDate)
    if (date < minDate || date > maxDate) {
      throw new AppError(
        `Invoice date must be between ${minDate.toDateString()} and ${maxDate.toDateString()}`
      )
    }
  }

  const invoice: Invoice = {
    ...input,
    financialYear,
  }

  return await this.invoiceRepo.create(invoice)
    }
}