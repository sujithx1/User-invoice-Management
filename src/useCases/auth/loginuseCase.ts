import { AppError } from "../../config/AppError";
import { comparePass } from "../../config/hashPass";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserMap } from "../../map/usermap";
import { ErrorCodes, StatusCode, UserMap_type } from "../../types/types";

export class UserLoginuseCase{
    constructor(
        private userrep:IUserRepository
    ) {

        
    }


    async execute(email:string,password:string,timezone:string):Promise<UserMap_type>{

        const user=await this.userrep.findByEmail(email)
        if(!user)throw new AppError(ErrorCodes.user_not_found,StatusCode.NOT_FOUND);
        const update=await this.userrep.updateTimeZone(user.id,timezone)
        if(!update)throw new AppError(ErrorCodes.Server_errors,StatusCode.INTERNAL_SERVER_ERROR)
        const passwordCheck=await comparePass(password,user.password)
        if(!passwordCheck)throw new AppError(ErrorCodes.password_match,StatusCode.NOT_FOUND);
        user.TimeZone=timezone
        return UserMap(user)
        
        

    }
}