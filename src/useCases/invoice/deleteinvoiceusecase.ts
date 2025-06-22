import { InvoiceRepository } from "../../domain/interfaces/repositories/IInvoiceRepositories"

export const deleteInvoiceUseCase = async (
  id: string,
  userId: string,
  repo: InvoiceRepository
): Promise<void> => {
  const invoice = await repo.findById(id)
  if (!invoice) throw new Error("Invoice not found")

  if (invoice.createdBy !== userId) throw new Error("Unauthorized delete attempt")

  await repo.delete(id)
}
