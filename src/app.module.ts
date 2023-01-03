import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/core/user/users.module";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import { dataSourceOptions } from "../db/data-source";
import { SecurityModule } from "./modules/core/security/security.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    SharedModule,
    SecurityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
