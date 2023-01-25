import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/user.entity";
import { SharedModule } from "../../shared/shared.module";
import { ArpStudioUser } from "./domain/arpStudio.user.entity";
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { Controllers } from "./controllers";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [TypeOrmModule.forFeature([User,ArpStudioUser]),
        SharedModule,CqrsModule],
    controllers: Controllers,
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class UsersModule {}
