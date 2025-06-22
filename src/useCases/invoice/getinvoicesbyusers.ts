import { AppError } from "../../config/AppError";
import { Invoice } from "../../domain/entities/invoiceentity";
import { InvoiceRepository } from "../../domain/interfaces/repositories/IInvoiceRepositories";
import { ErrorCodes } from "../../types/types";


export class InvoiceGetbyuserIduseCase{
    constructor(private invoicerep:InvoiceRepository) {
        
    }

    async execute(userId:string):Promise<Invoice[]>{

        const invoices=await this.invoicerep.findByUserId(userId)
        if(!invoices)throw new AppError(ErrorCodes.Server_errors);
        return invoices
        

    }
}