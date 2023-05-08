import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.model";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilesService } from "../files/files.service";
import { GeneratePdfDto } from "./dto/generate-pdf.dto";
import { UtilsService } from "../utils/utils.service";
import { IFilesService } from "../files/interface/IFileService";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(IFilesService)private  readonly fileService:IFilesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail({ email }:GeneratePdfDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      user.email = updateUserDto.email || user.email;
      user.firstName = updateUserDto.firstName || user.firstName;
      user.lastName = updateUserDto.lastName || user.lastName;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async uploadImg(id:number, img:any):Promise<boolean>{
    try {
      const user=await this.userRepository.findOneBy({id});

      const fileName=await this.fileService.uploadImage(img);
      if(fileName ==null){
        return  false;
      }
      user.image=fileName;
      await this.userRepository.save(user);
      return true
    }catch(e) {
      throw e;
    }

  }

  async createPDF(dto:GeneratePdfDto):Promise<boolean>{
    try {
      const user=await this.findByEmail(dto);
    if(!user.image) return false;
      if(!user)return false;

      const buffPDT=await this.fileService.generatePdf(user);

      if(!buffPDT)return false;
      user.pdf=buffPDT;
      await this.userRepository.save(user);
      return true;
    }catch (e){
      throw  e;
    }

  }
}
