import { UserEntity } from "../../domain/entities/userentity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import userModel, { IUser } from "../models/userModel";

const ReturnUser=(user:IUser):UserEntity=>{
    return {
        userId:user.userId,
    id:user._id.toString(),
        name:user.name,
        email:user.email,
        password:user.password,
        role:user.role,
        groupId:user.groupId,
        isActive:user.isActive,
        createdBy:user.createdBy,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt

    
    }
}
export class UserRepository implements IUserRepository{
   async create(user: UserEntity): Promise<UserEntity > {


  const userData=await userModel.create(user)
  return ReturnUser(userData)

    

    
       
   }
   async findByEmail(email: string): Promise<UserEntity | null> {
    const user=await userModel.findOne({email:email})
    if(!user)return null
    return ReturnUser(user)
       
   }
  async findById(id: string): Promise<UserEntity | null> {
       const user=await userModel.findById(id)
       if(!user)return null
       return ReturnUser(user)
   }
  async findByuserId(userid: string): Promise<UserEntity | null> {

    const user=await userModel.findOne({userId:userid})
    if(!user)return null
    return ReturnUser(user)

       
   }

 async updateTimeZone(id: string, TimeZone: string): Promise<UserEntity|null> {
       const user=await userModel.findByIdAndUpdate(id,{$set:{TimeZone:TimeZone}},{upsert:true,new:true})
       if(!user)return null
       return ReturnUser(user)
   }

   async findByName(name: string): Promise<UserEntity | null> {
    const user=await userModel.findOne({name})
    if(!user)return null
    return ReturnUser(user)
       
   }
async update(id: string, userData: UserEntity): Promise<UserEntity | null> {

    const user=await userModel.findByIdAndUpdate(id,{$set:{
        name:userData.name,
        userId:userData.userId,
        role:userData.role
    }},{upsert:true,new:true})

    return ReturnUser(user)
    
}


async findAll(): Promise<UserEntity[]> {
    const users= await userModel.find()
    return users.map((user)=>ReturnUser(user))
}



async findIdBlock(id: string): Promise<boolean> {
    const update=await userModel.findByIdAndUpdate(id,{$set:{isActive:false}},{upsert:true,new:true})
    if(!update)return false
    return true
}
}