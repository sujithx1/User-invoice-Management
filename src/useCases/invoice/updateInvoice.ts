import { AppError } from "../../config/AppError"
import { Invoice } from "../../domain/entities/invoiceentity"
import { InvoiceRepository } from "../../domain/interfaces/repositories/IInvoiceRepositories"
import { ErrorCodes } from "../../types/types"
import { getFinancialYear } from "../../utils/financialYearUtil"

interface UpdateInvoiceInput extends Partial<Invoice> {
  id: string
  createdBy: string
}

export const updateInvoiceUseCase = async (
  input: UpdateInvoiceInput,
  invoiceRepo: InvoiceRepository
): Promise<Invoice> => {
  const existing = await invoiceRepo.findById(input.id)
  if (!existing) throw new Error("Invoice not found")

  if (existing.createdBy !== input.createdBy) {
    throw new Error("Unauthorized to update this invoice")
  }

  const updatedDate = input.invoiceDate ? new Date(input.invoiceDate) : new Date(existing.invoiceDate)
  const financialYear = getFinancialYear(updatedDate)

  if (
    input.invoiceNumber &&
    input.invoiceNumber !== existing.invoiceNumber
  ) {
    const duplicate = await invoiceRepo.findByNumberAndFY(input.invoiceNumber, financialYear)
    if (duplicate) throw new Error("Invoice number already exists for this financial year")
  }
const updatedInvoice = await invoiceRepo.update({
  ...existing,
  ...input,
  financialYear,
})

if(!updatedInvoice)throw new AppError(ErrorCodes.Server_errors)
return updatedInvoice


}
