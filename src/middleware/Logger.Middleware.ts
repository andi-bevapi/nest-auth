import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtServ: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: Function) {
    try {
      const headers = req.headers;
      const authorization = headers['authorization'];
      if (!authorization) {
        throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
      }
      const token = authorization.split(' ')[1];
      let user;

      const verifyToken = await this.jwtServ
        .verifyAsync(token)
        .catch((error) => {
          return error;
        });
      if (verifyToken instanceof Error) {
        throw new HttpException('Token has expired', HttpStatus.FORBIDDEN);
      }
      //
      const { id, email } = verifyToken.payload;
      user = await this.userService.findByEmail(email);

      if(user){
        req["user"] = user;
      }
      // console.log('-OK--', verifyToken);
      next();
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
