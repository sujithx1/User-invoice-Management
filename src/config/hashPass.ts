

import bcrypt from 'bcrypt';

export const hashfn = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};


export const comparePass=async(plainpassword:string,hashpassword:string)=>{

    return await bcrypt.compare(plainpassword,hashpassword)


}