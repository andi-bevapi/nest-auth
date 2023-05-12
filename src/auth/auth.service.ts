import { HttpException,HttpStatus ,Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {hashPassword,comparePassword} from "../helpers/index";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(private readonly userService:UserService,private jwtService:JwtService){
}

public async getAllUsers():Promise<any>{
    try{
      return this.userService.findAll();
    }catch(err){
      return err;
    }
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
     const comparePass = await comparePassword(password,user.password);
     if(comparePass){
      const token = this.jwtService.sign({payload:user}); 
       return token;
     }
     throw new HttpException("Password does not match", HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);

  }catch(error){
    console.log("error---auth-service",error);
    return error;
  }
}

}