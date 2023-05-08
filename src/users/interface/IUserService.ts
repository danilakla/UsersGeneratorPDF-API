import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../users.model";
import { GeneratePdfDto } from "../dto/generate-pdf.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findByEmail({ email }: GeneratePdfDto): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  remove(id: number): Promise<void>;
  uploadImg(id: number, img: any): Promise<boolean>;
  createPDF(dto: GeneratePdfDto): Promise<boolean>;
}
export const IUsersService = Symbol("IUsersService");