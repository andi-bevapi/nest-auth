import { Controller,Get,Post,Request} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('api')
export class AuthController {

    constructor(private readonly userService:UserService){}

    @Get('register')
    public authenticate(@Request() request):Promise<any>{

        console.log("test-register");

        return this.userService.findAll();
    }
}
