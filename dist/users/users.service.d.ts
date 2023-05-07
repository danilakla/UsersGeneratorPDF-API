import { User } from "./users.model";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilesService } from "../files/files.service";
import { GeneratePdfDto } from "./dto/generate-pdf.dto";
import { UtilsService } from "../utils/utils.service";
export declare class UsersService {
    private readonly userRepository;
    private readonly fileService;
    private readonly utilService;
    constructor(userRepository: Repository<User>, fileService: FilesService, utilService: UtilsService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail({ email }: GeneratePdfDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    uploadImg(id: number, img: any): Promise<boolean>;
    createPDF(dto: GeneratePdfDto): Promise<boolean>;
}
