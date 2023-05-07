import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { GeneratePdfDto } from "./dto/generate-pdf.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    uploadImg(id: number, image: any): Promise<boolean>;
    generatePdf(generatePdfDto: GeneratePdfDto): Promise<{
        isGenerated: boolean;
    }>;
}
