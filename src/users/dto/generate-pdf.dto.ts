import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GeneratePdfDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}