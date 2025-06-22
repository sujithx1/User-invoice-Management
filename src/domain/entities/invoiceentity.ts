

export class InvoiceEntity{
    constructor(
 public invoiceNumber: string,
 public invoiceDate: Date,
  public invoiceAmount: number,
  public customerName?: string,
  public customerEmail?: string,
  public description?: string,
  public dueDate?: Date
    ) {
        
    }
}


export interface Invoice {
  id?: string
  invoiceNumber: string
  invoiceDate: Date
  invoiceAmount: number
  customerName?: string
  customerEmail?: string
  description?: string
  dueDate?: Date
  financialYear: string
  createdBy: string
}
