

export class InvoiceEntity{
    constructor(

 public invoiceNumber: number,
 public invoiceDate: Date,
 public amount: number,
 public createdBy: string,
 public financialYear: string,
 public createdAt?:Date,
 public updatedAt?:Date,

    ) {
        
    }
}