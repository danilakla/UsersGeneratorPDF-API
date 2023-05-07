import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private  readonly authService:AuthService) {
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
