import * as bcrypt from "bcrypt";
import { HttpException,HttpStatus ,Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
constructor(private readonly userService:UserService){
}

public async getAllUsers():Promise<any>{
    return this.userService.findAll();
}

public async registerUser(username:string,lastname:string,email:string,password:string):Promise<any>{
    try{
        const user = await this.userService.findByEmail(email);

        if(user){
            throw new HttpException("Already exist", HttpStatus.CONFLICT);
        }
        const hashPassword = await bcrypt.hash(password,25);
        const result = await this.userService.register(username,lastname,email,hashPassword);
        console.log("result---auth-service",result);
        return result;
    }catch(error){
        console.log("error---auth-service",error);
    }
}

}