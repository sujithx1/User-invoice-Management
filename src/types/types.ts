import { UserRole } from "../domain/entities/userentity";

export const ErrorCodes = {
    Server_errors: 'Serverside Error', 
    password_match: 'Password not matching',
    user_not_found: 'User Not Found',
    Resourse_not_found: 'ResourseNotFound',
    ValidationError:'Validation Error or missing field',
    Id_Missing:'Missing Id',
    Missing_TimeZone:"Missing TimeZone",
    Already_exist:"User Email Already Exists",
    Already_name_exist:"User Name Already Exists"
  } as const;


  export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
}




export interface UserMap_type{
   readonly userId: string,
       readonly id:string,
       name: string,
       email: string,
       role: UserRole,
       createdBy: string,
       TimeZone:string,
       isActive:boolean,
       createdAt?:Date,
       updatedAt?:Date,
       groupId?: string

}

export interface JwtParameter_type{
  id:string,
  role:string,
  userId:string
}


export interface UserCreate_types{
  name:string,
  email:string,
  password:string,
  userId:string,
  createdBy:string
  role:UserRole,
  TimeZone:string
}