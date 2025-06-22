import { AppError } from "../../config/AppError";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { ErrorCodes, StatusCode } from "../../types/types";


export class DeletUseruseCase{
    constructor(
        private userrep:IUserRepository
    ) {
        
    }

    async execute(id:string):Promise<boolean>{

        const findUser=await this.userrep.findById(id)
        if(!findUser)throw new AppError(ErrorCodes.user_not_found,StatusCode.NOT_FOUND);
        const update=await this.userrep.findIdBlock(id)
        if(!update)throw new AppError(ErrorCodes.Server_errors,StatusCode.INTERNAL_SERVER_ERROR)
        return true
        

    }
}