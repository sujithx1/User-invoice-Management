import { UserRepository } from "../infrastructores/repositories/userrepositories";
import { UserController } from "../presentations/controllers/authController";
import { UserCreateuseCase } from "../useCases/auth/create.usecase";
import { DeletUseruseCase } from "../useCases/auth/deleteuser";
import { FindUser } from "../useCases/auth/finduser";
import { UserLoginuseCase } from "../useCases/auth/loginuseCase";
import { UpadteUseruseCase } from "../useCases/auth/updateuser";
import { GetAllusersuseCase } from "../useCases/superadmin/getallusersuseCase";



const userRep=new UserRepository()

const userlogin=new UserLoginuseCase(userRep)
const usercreate=new UserCreateuseCase(userRep)
const useredit=new UpadteUseruseCase(userRep)
const getallusers=new GetAllusersuseCase(userRep)
const userDelete=new DeletUseruseCase(userRep)
const finduser=new FindUser(userRep)
export const userController=new UserController(userlogin,usercreate,useredit,getallusers,userDelete,finduser) 