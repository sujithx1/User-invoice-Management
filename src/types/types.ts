
export const ErrorCodes = {
    Server_errors: 'Serverside Error', 
    password_match: 'Password not matching',
    user_not_found: 'User Not Found',
    Resourse_not_found: 'ResourseNotFound',
    ValidationError:'Validation Error or missing field',
    Id_Missing:'Missing Id'
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
