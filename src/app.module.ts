import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmConfig } from "./ormconfig";
import { UsersModule } from "./core/user/users.module";
import { SharedModule } from "./shared/shared.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
