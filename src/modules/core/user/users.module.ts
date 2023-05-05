import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateController } from 'apps/api/user/create.controller';
import { ArpStudioCreateUserService } from './services/arpstudio/createUser.service';
import { ArpStudioUser } from './entity/createArpStudio.entity';
import { UserDetailController } from 'apps/api/user/detail.controller';
import { GetUserDetailArpStudioService } from './services/arpstudio/getUserDetail.service';
import { VelaCreateUserService } from './services/vela/createUser.service';
import { VelaUser } from './entity/createVelaUser.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArpStudioUser,VelaUser]),
        SharedModule,CqrsModule],
    controllers: [CreateController,UserDetailController],
    providers: [
        ArpStudioCreateUserService,GetUserDetailArpStudioService,
        VelaCreateUserService
    ],
})

export class UsersModule {}
