import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const isPublic = this.reflector.getAllAndOverride<boolean>("public",[context.getHandler(),context.getClass()]);
    console.log('---roles--as---isPublic--', isPublic);

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const roles = request.user["roles"];

    console.log('---roles----', roles);

    if(roles === "guest" && typeof isPublic === "undefined"){
      return true
    } else{
      throw new UnauthorizedException()
    }
    
  }
}