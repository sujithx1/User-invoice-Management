import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types/types";
import jwt from "jsonwebtoken"
const accessSecret=process.env.JWT_ACCESS_SECRET!

export const Authentication=(req:Request,res:Response,next:NextFunction):void=>{

    const authHeader=req.headers['authorization']
    const token=authHeader&& authHeader.split(' ')[1]
    
    if(!token)
    {
     res.status(StatusCode.UNAUTHORIZED).json({message:'Token required'})
     return
    }


    jwt.verify(token,accessSecret,(err,user)=>{
    if (err) {
        res.status(StatusCode.FORBIDDEN).json({message:err})
        return
    }
    console.log(user);
    next()
    
   })


}