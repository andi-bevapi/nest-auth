import { Controller,Get,Post,Request,Body} from '@nestjs/common';
import { User } from "../user/user.entity";
import {AuthService} from "./auth.service";

@Controller('api')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get('all-user')
    public getAll(){
        return this.authService.getAllUsers();
    }

    @Post('register')
    public async authenticate(
        @Body("firstname") firstname:string,
        @Body("lastname") lastname:string,
        @Body("email") email:string,
        @Body("password") password:string
        ): Promise<User>{

        const result = await this.authService.registerUser(firstname,lastname,email,password);
        return result;
    }
}
