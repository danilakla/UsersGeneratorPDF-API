import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
    registration(user: CreateUserDto): Promise<void>;
}
