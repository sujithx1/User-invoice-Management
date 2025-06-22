import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IInvoice extends Document {
    _id:ObjectId;
  invoiceNumber: string
  invoiceDate: Date
  invoiceAmount: number
  customerName?: string
  customerEmail?: string
  description?: string
  dueDate?: Date
  financialYear: string
  createdBy: string // userId reference
  createdAt: Date
  updatedAt: Date
}

const InvoiceSchema: Schema<IInvoice> = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    invoiceAmount: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    financialYear: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      ref: "User", 
    },
  },
  {
    timestamps: true, 
  }
)

export const invoicemodel=  mongoose.model<IInvoice>("Invoice", InvoiceSchema)
