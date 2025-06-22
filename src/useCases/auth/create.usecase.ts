import { AppError } from "../../config/AppError";
import { hashfn } from "../../config/hashPass";
import { getRoleFirstletter } from "../../config/helper";
import { UserEntity } from "../../domain/entities/userentity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserMap } from "../../map/usermap";
import { ErrorCodes, StatusCode, UserCreate_types, UserMap_type } from "../../types/types";

export class UserCreateuseCase {
  constructor(private userrep: IUserRepository) {}

  async execute(userData:UserCreate_types): Promise<UserMap_type> {
    const findemail=await this.userrep.findByEmail(userData.email)
    if(findemail)throw new AppError(ErrorCodes.Already_exist,StatusCode.BAD_REQUEST)
    const findName=await this.userrep.findByName(userData.name)
   if(findName)throw new AppError(ErrorCodes.Already_name_exist,StatusCode.BAD_REQUEST)


    const userId = `${getRoleFirstletter(userData.role)}${Date.now()}`;
    
    userData.userId = userId;
    const hash= await hashfn(userData.password)
  const newUser: UserEntity = {
      id: "",
      ...userData,       
      password: hash,  
      isActive:true,
      TimeZone:userData.TimeZone
  }

    return UserMap(await this.userrep.create(newUser));
  }
}
