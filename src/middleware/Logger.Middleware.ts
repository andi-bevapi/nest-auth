import { Injectable,NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:Function){
        console.log('Middleware...');
        next();
    }
}