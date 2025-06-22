import { NextFunction, Request, Response } from "express";
import { ErrorCodes, StatusCode } from "../../types/types";
import { AppError } from "../../config/AppError";
import { mongoInvoiceRepository } from "../../infrastructores/repositories/invoicereposritory";
import { InvoiceCreateuseCase } from "../../useCases/invoice/create";
import { updateInvoiceUseCase } from "../../useCases/invoice/updateInvoice";
import { deleteInvoiceUseCase } from "../../useCases/invoice/deleteinvoiceusecase";
import { InvoiceGetbyuserIduseCase } from "../../useCases/invoice/getinvoicesbyusers";

export class InvoiceController{
    constructor(private createinvoice:InvoiceCreateuseCase,
        private getinvoicesbyuserID:InvoiceGetbyuserIduseCase
    ) {
        
    }



   async invoiceCreate(req: Request, res: Response, next: NextFunction) {
    try {
     const userId = req.params.userId
    const {
      invoiceNumber,
      invoiceDate,
      invoiceAmount,
      customerName,
      customerEmail,
      description,
      dueDate,
    } = req.body
    if (!userId) return next(new AppError(ErrorCodes.Id_Missing, 404));
     
     
    const result = await this.createinvoice.execute(
      {
        invoiceNumber,
        invoiceDate: new Date(invoiceDate),
        invoiceAmount,
        customerName,
        customerEmail,
        description,
        dueDate,
        createdBy: userId,
      } )
      res
      .status(StatusCode.CREATED)
        .json({ success: true, message: "invoice created" ,invoice:result});
    } catch (err) {
      next(err);
    }
  }


   async invoiceUpdate(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params
    const userId = req.params.userId
    const data = req.body

    const updated = await updateInvoiceUseCase(
      {
        id,
        createdBy: userId,
        ...data,
      },
      mongoInvoiceRepository
    )


      res
      .status(StatusCode.CREATED)
        .json({ success: true, message: "invoice created" ,invoice:updated});
    } catch (err) {
      next(err);
    }
  }

   async invoicedelete(req: Request, res: Response, next: NextFunction) {
    try {
   const { id } = req.params
    const userId = req.params.userId

    await deleteInvoiceUseCase(id, userId, mongoInvoiceRepository)
      res
      .status(StatusCode.CREATED)
        .json({ success: true, message: "invoice created" });
    } catch (err) {
      next(err);
    }
  }


  

   async getinvoiceByusers(req: Request, res: Response, next: NextFunction) {
    try {
     const userId = req.params.userId
  
    if (!userId) return next(new AppError(ErrorCodes.Id_Missing, 404));
     
     const invoices=await this.getinvoicesbyuserID.execute(userId)
      res
      .status(StatusCode.OK)
        .json({ success: true, message: "invoices" ,invoices});
    } catch (err) {
      next(err);
    }
  }

}