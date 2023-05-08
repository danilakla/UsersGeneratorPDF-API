import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { ConfigService } from "@nestjs/config";
import { IAuthService } from "./interface/IAuthService";

@Module({
  imports:[    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET_KEY'),
        signOptions: { expiresIn: '10000s' },
      }),
      inject: [ConfigService],
    }),
  UsersModule],
  controllers: [AuthController],
  providers: [{
    useClass:AuthService,
    provide:IAuthService
  },JwtStrategy]
})
export class AuthModule {}
