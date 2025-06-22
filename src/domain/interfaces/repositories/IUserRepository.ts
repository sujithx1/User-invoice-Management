import { UserEntity } from "../../entities/userentity";


export interface IUserRepository{
    findByEmail(email:string):Promise<UserEntity|null>
    findById(id:string):Promise<UserEntity|null>
    findByuserId(userid:string):Promise<UserEntity|null>
    create(user:UserEntity):Promise<UserEntity>
    findByName(name:string):Promise<UserEntity|null>
    updateTimeZone(id:string,TimeZone:string):Promise<UserEntity|null>
    update(id:string,userData:UserEntity):Promise<UserEntity|null>
    findAll():Promise<UserEntity[]>
    findIdBlock(id:string):Promise<boolean>
}