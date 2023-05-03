import { Controller,Get,Post,Request} from '@nestjs/common';

@Controller('api')
export class AuthController {

    @Post('register')
    public authenticate(@Request() request){
        return "test";
    }
}
