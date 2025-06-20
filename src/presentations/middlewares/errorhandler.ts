
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../config/AppError"; 



export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  })

}