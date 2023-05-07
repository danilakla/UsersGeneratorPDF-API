import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilsModule } from "../utils/utils.module";

@Module({
  providers: [FilesService],
  exports:[FilesService],
  imports:[UtilsModule]
})
export class FilesModule {}
