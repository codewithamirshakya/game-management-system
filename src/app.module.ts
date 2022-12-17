import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmConfig } from "./ormconfig";
import { UsersModule } from "./core/user/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
