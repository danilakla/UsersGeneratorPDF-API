import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { IAuthService } from "./interface/IAuthService";

@Controller('auth')
export class AuthController {
  constructor(@Inject(IAuthService) private  readonly authService:IAuthService) {
  }

  @Post("/login")
  async login(@Body() user:LoginUserDto){
    try {
      const token=await this.authService.login(user.email);
      return token;
    }catch (e) {
      throw e;
    }

  }


  @Post("/registration")
  async registration(@Body() user:CreateUserDto){
    try {
await this.authService.registration(user);
    }catch (e) {
      throw e;
    }

  }


}
