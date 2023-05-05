import * as bcrypt from "bcrypt";

export async function hashPassword(password:string):Promise<string>{
    const hashPassword = await bcrypt.hash(password,10);
    return hashPassword;
}


export async function comparePasword(password:string):Promise<boolean>{
    
}