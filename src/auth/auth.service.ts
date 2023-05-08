import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { use } from "passport";
import { IUsersService } from "../users/interface/IUserService";
import { IUtilsService } from "../utils/interface/Iutile.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUsersService)  private usersService: IUsersService,
    private jwtService: JwtService
  ) {
  }

  async registration(user: CreateUserDto) {
    try {
      const hasUser = await this.usersService.findByEmail({ email: user.email });
      if (hasUser) throw  new BadRequestException();
      await this.usersService.create(user);

    } catch (e) {
      throw  e;
    }
  }

  async login(email: string) {

    try {
      const hasUser = await this.usersService.findByEmail({ email });
      if (!hasUser) throw  new BadRequestException();
      const payload = { email ,name:"app",task:true};

      return {
        access_token: this.jwtService.sign(payload)
      };
    } catch (e) {
      throw e;
    }

  }

}
