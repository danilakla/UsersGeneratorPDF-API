import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.model";
import { FilesModule } from "../files/files.module";
import { UtilsService } from "../utils/utils.service";
import { UtilsModule } from "../utils/utils.module";
import { IUsersService } from "./interface/IUserService";

@Module({
  imports:[TypeOrmModule.forFeature([User]), FilesModule,UtilsModule],
  controllers: [UsersController],
  providers: [{
    provide:IUsersService,
    useClass:UsersService
  }],
  exports:[IUsersService]
})
export class UsersModule {}
