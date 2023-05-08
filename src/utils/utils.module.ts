import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { IUtilsService } from "./interface/Iutile.service";

@Module({
  providers: [{
    provide:IUtilsService,
    useClass:UtilsService
  }],
  exports:[IUtilsService],
})
export class UtilsModule {}
