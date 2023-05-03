import { Controller, Get ,Post, Request , Body,Param,UsePipes, Redirect ,HttpCode, ValidationPipe,UseGuards ,SetMetadata, UseInterceptors} from '@nestjs/common';

import { AppService } from './app.service';
import{Params} from "./dto/parameters.objects";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("protected/:id")
  public protectedRoute(@Param() params: Params){
    console.log("req.id",params);
    return "test";
  }

  @Post("user")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public createUser(@Body() body: Params){
    console.log("body------",body);
    return body;
  }
  
  @Get("authorized")
  @SetMetadata('roles', ['admin'])

  public authorized(@Request() req){
    console.log("req------",req.user);
    return "authorized";
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
