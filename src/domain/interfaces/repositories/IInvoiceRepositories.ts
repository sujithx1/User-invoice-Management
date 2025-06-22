import { Invoice } from "../../entities/invoiceentity"

export interface InvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>
  findById(id: string): Promise<Invoice | null>
  update(invoice: Invoice): Promise<Invoice|null>
  delete(id: string): Promise<void>
  findByNumberAndFY(invoiceNumber: string, financialYear: string): Promise<Invoice | null>
  findByFYAndUser(financialYear: string, userId: string): Promise<Invoice[]>
  findByUserId(userId:string):Promise<Invoice[]|null>
}
