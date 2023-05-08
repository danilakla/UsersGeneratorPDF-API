import { CreateUserDto } from "src/users/dto/create-user.dto";

export interface IAuthService {
  registration(user: CreateUserDto): Promise<void>;
  login(email: string): Promise<{ access_token: string }>;
}
export const IAuthService = Symbol("IAuthService");