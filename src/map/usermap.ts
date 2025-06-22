import { Invoice } from "../domain/entities/invoiceentity";
import { UserEntity } from "../domain/entities/userentity";
import { UserMap_type } from "../types/types";



export const UserMap=(user:UserEntity):UserMap_type=>{
    return{
        id:user.id,
        userId:user.userId,
        name:user.name,
        email:user.email,
        role:user.role,
        createdBy:user.createdBy,
        isActive:user.isActive,
        TimeZone:user.TimeZone||"",
        groupId:user.groupId,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
    }
}


export const mapInvoiceToResponse = (invoice: Invoice) => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber,
  invoiceDate: invoice.invoiceDate.toISOString(), // safe serialization
  invoiceAmount: invoice.invoiceAmount,
  customerName: invoice.customerName || null,
  customerEmail: invoice.customerEmail || null,
  description: invoice.description || null,
  dueDate: invoice.dueDate ? invoice.dueDate.toISOString() : null,
  financialYear: invoice.financialYear,
  createdBy: invoice.createdBy
})