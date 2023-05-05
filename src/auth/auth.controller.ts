import { Controller,Get,Post,Request,Response,Res,Body, HttpStatus} from '@nestjs/common';
import { User } from "../user/user.entity";
import {AuthService} from "./auth.service";
import { response } from 'express';

@Controller('api')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get('allUser')
    public getAll(){
        return this.authService.getAllUsers();
    }

    @Post('register')
    public async authenticate(
        @Response() response,
        @Body("firstname") firstname:string,
        @Body("lastname") lastname:string,
        @Body("email") email:string,
        @Body("password") password:string
        ): Promise<User>{
        const result = await this.authService.registerUser(firstname,lastname,email,password);
        const res = {"message": HttpStatus.OK ,result:result};
        return response.send(res);
    }

    @Get('login')
    public async login(@Body("email") email:string,@Body("password") password:string):Promise<any>{
        
    }
}
