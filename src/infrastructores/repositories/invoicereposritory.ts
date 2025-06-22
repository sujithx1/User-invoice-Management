import { InvoiceRepository } from "../../domain/interfaces/repositories/IInvoiceRepositories"
import { IInvoice, invoicemodel } from "../models/invoicemodel"
import {Invoice}from "../../domain/entities/invoiceentity"



export const ReturnInvoice = (invoice: IInvoice): Invoice => {
  return {
    id: invoice._id.toString(),
    invoiceNumber: invoice.invoiceNumber,
    invoiceDate: new Date(invoice.invoiceDate),
    invoiceAmount: invoice.invoiceAmount,
    customerName: invoice.customerName,
    customerEmail: invoice.customerEmail,
    description: invoice.description,
    dueDate: invoice.dueDate ? new Date(invoice.dueDate) : undefined,
    financialYear: invoice.financialYear,
    createdBy: invoice.createdBy
  }
}
export const mongoInvoiceRepository: InvoiceRepository = {
  async create(invoice) {
    const created = await invoicemodel.create(invoice)
    return  ReturnInvoice(created)
  },

  async findByNumberAndFY(invoiceNumber, financialYear) {
    const invoices= await invoicemodel.findOne({ invoiceNumber, financialYear })
    if(!invoices)return null
      return ReturnInvoice(invoices)
  },

  async findByFYAndUser(financialYear, userId) {
    const invoice=  await invoicemodel.find({ financialYear, createdBy: userId })

    return invoice.map((item)=>ReturnInvoice(item))
  },
  async findById(id) {
     const invoice= await invoicemodel.findById(id)
     if(!invoice)return null
      return ReturnInvoice(invoice)
  },

 
  async update(invoice: Invoice) {
    const updated = await invoicemodel.findByIdAndUpdate(invoice.id, invoice, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updated) throw new Error("Update failed")
    return ReturnInvoice(updated)
  },
  async delete(id) {
    await invoicemodel.findByIdAndDelete(id)
  },

  async findByUserId(userId) {
      const invoices=await invoicemodel.find({createdBy:userId})
      if(!invoices)return null
      return invoices.map((item)=>ReturnInvoice(item))
  },


  async findByAll() {
      const invoice =await invoicemodel.find()
      if(invoice.length==0)return null
      return invoice.map((item)=>ReturnInvoice(item))
  },

}
