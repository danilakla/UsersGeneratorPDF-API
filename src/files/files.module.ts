import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilsModule } from "../utils/utils.module";
import { IFilesService } from "./interface/IFileService";

@Module({
  providers: [{
useClass :FilesService,
    provide:IFilesService
  }],
  exports:[IFilesService],
  imports:[UtilsModule]
})
export class FilesModule {}
