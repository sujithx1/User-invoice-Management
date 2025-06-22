import { AppError } from "../../config/AppError";
import { getRoleFirstletter } from "../../config/helper";
import { UserEntity, UserRole } from "../../domain/entities/userentity";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserMap } from "../../map/usermap";
import { ErrorCodes, StatusCode, UserMap_type } from "../../types/types";


export class UpadteUseruseCase  {
    constructor(private userRep:IUserRepository) {
        
    }


    async execute(id:string,userData:Partial<UserEntity>):Promise<UserMap_type>{

        const finduser=await this.userRep.findById(id)

        if(!finduser)throw new AppError(ErrorCodes.user_not_found,StatusCode.NOT_FOUND)

            if (userData.role&&userData.role!==finduser.role) {
                
                finduser.role=userData.role as UserRole
                const userId = `${getRoleFirstletter(userData.role)}${Date.now()}`;
                finduser.userId=userId
            }
            finduser.TimeZone=userData.TimeZone
        const update=await this.userRep.update(id,finduser)
        if(!update)throw new AppError(ErrorCodes.Server_errors);
        return UserMap(update)
        
    }
}