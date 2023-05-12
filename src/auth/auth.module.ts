import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '300s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
