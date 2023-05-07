import {
  Body,
  Controller,
  Delete, Get,
  InternalServerErrorException,
  Param,
  Post, Put,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { GeneratePdfDto } from "./dto/generate-pdf.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

@Controller("users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }


  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("/get-all")
  async findAll(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)

  @Get("/get-one/:id")
  async findOne(@Param("id") id: number): Promise<User> {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)

  @Put("update/:id")
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)

  @Delete("delete/:id")
  async remove(@Param("id") id: number): Promise<void> {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)

  @Post("add-img/:id")
  @UseInterceptors(FileInterceptor("image"))
  async uploadImg(@Param("id") id: number, @UploadedFile() image): Promise<boolean> {
    try {
      return await this.usersService.uploadImg(id, image);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)

  @Post("/generate-pdf")
  async generatePdf(@Body() generatePdfDto:GeneratePdfDto):Promise<{ isGenerated:boolean }>{
    try {
      const isGenerated=await this.usersService.createPDF(generatePdfDto)
      return {
        isGenerated
      };

    }catch (error) {
      throw new InternalServerErrorException(error.message);

    }

  }
}
