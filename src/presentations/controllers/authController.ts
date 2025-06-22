import { NextFunction, Request, Response } from "express";
import { AppError } from "../../config/AppError";
import { ErrorCodes, JwtParameter_type, StatusCode } from "../../types/types";
import { UserLoginuseCase } from "../../useCases/auth/loginuseCase";
import { generateAcceToken, generateRefreshToken } from "../../config/jwt";
import { UserCreateuseCase } from "../../useCases/auth/create.usecase";
import { UpadteUseruseCase } from "../../useCases/auth/updateuser";
import { GetAllusersuseCase } from "../../useCases/superadmin/getallusersuseCase";
import { DeletUseruseCase } from "../../useCases/auth/deleteuser";
import { FindUser } from "../../useCases/auth/finduser";


export class UserController {
  constructor(private userlogin: UserLoginuseCase,
    private usercreate:UserCreateuseCase,
    private userEdit:UpadteUseruseCase,
    private  findallusers:GetAllusersuseCase,
    private userdelete:DeletUseruseCase,
    private finduser:FindUser
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, timezone } = req.body;
      if (!email || !password)
        return next(
          new AppError(ErrorCodes.ValidationError, StatusCode.BAD_REQUEST)
        );
      if (!timezone || typeof timezone !== "string") {
        return next(
          new AppError(ErrorCodes.Missing_TimeZone, StatusCode.BAD_REQUEST)
        );
      }
      const user = await this.userlogin.execute(email, password, timezone);
      const payload:JwtParameter_type={
        id:user.id,
        role:user.role,
        userId:user.userId
      }
      const accessToken=generateAcceToken(payload)
      const refreshToken=generateRefreshToken(payload)  
        
      return res.cookie(`${payload.role}_refreshToken`,refreshToken,{
        httpOnly:true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })  
      
      .status(StatusCode.OK).json({ success: true,message:"Login Success",user ,accessToken});
    } catch (error) {
      return next(error);
    }
  }




  async create(req:Request,res:Response,next:NextFunction){
   try {
     const {name,password,email,role,createdBy,TimeZone}=req.body
    if(!name &&typeof name !=="string" ||!password &&typeof password !=="string"||!email &&typeof email !=="string"||!role &&typeof role !=="string"||!createdBy &&typeof createdBy !=="string"||!TimeZone){
      return next(new AppError(ErrorCodes.ValidationError,StatusCode.BAD_REQUEST))
    }

    const user=await this.usercreate.execute({name,email,password,role,createdBy,userId:"",TimeZone})
  
    return res.status(StatusCode.CREATED).json({success:true,message:"User Created",user})
    
   } catch (error) {
    return next(error)
   }
  }
  async userUpdate(req:Request,res:Response,next:NextFunction){
   try {
     const {name,role,TimeZone}=req.body
      const{id}=req.params
      if(!id)return next(new AppError(ErrorCodes.Id_Missing,StatusCode.BAD_REQUEST))
    const user=await this.userEdit.execute(id,{name,role,TimeZone})
  
    return res.status(StatusCode.OK).json({success:true,message:"User Updated",user})
    
   } catch (error) {
    return next(error)
   }
  }
  async deleteUser(req:Request,res:Response,next:NextFunction){
   try {
      const{id}=req.params
      if(!id)return next(new AppError(ErrorCodes.Id_Missing,StatusCode.BAD_REQUEST))
         await this.userdelete.execute(id)
  
    return res.status(StatusCode.OK).json({success:true,message:"User deleted"})
    
   } catch (error) {
    return next(error)
   }
  }
  async getallusers(req:Request,res:Response,next:NextFunction){
   try {
    
    const users=await this.findallusers.execute()
  
    return res.status(StatusCode.OK).json({success:true,message:"Users",users})
    
   } catch (error) {
    return next(error)
   }
  }



   async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id) return next(new AppError(ErrorCodes.Id_Missing, 404));
      const user = await this.finduser.execute(id);
      const role=user.role
     
      res
        .clearCookie(`${role}_refreshToken`, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(StatusCode.OK)
        .json({ success: true, message: "User logout success" });
    } catch (err) {
      next(err);
    }
  }


}
