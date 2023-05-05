import { HttpException,HttpStatus ,Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {hashPassword} from "../helpers/index";

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
        const hashedPass = await hashPassword(password);
        const result = await this.userService.register(username,lastname,email,hashedPass);
        return result;
    }catch(error){
        console.log("error---auth-service",error);
        return error;
    }
}


public async loginUser(email:string,password:string):Promise<any>{

  try{
    const user = await this.userService.findByEmail(email);

    if(user){
     const comparePassword = this.comparePassword(password,user.password);
    }
  }catch(error){
    console.log("error---auth-service",error);
    return error;
  }
}

}