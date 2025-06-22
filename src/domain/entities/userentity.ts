export type UserRole = "SUPER_ADMIN" | "ADMIN" | "UNIT_MANAGER" | "USER";

export class UserEntity {
  constructor(
    public  userId: string,
    public  id:string,
    public name: string,
    public email: string,
    public role: UserRole,
    public password: string,
    public createdBy: string,
    public isActive:boolean=true,
    public TimeZone?:string,
    public createdAt?:Date,
    
    public updatedAt?:Date,
    public groupId?: string
  ) {}
}
