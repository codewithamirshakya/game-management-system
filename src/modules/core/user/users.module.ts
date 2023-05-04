import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "./domain/user.entity";
import { SharedModule } from "../../shared/shared.module";
// import { ArpStudioUser } from "./domain/arpStudio.user.entity";
// import { DependenciesConstants } from "./dependencies";
// import { Providers } from "./providers";
import { Controllers } from "./controllers";
import { CqrsModule } from "@nestjs/cqrs";
// import {EvolutionUser} from "./domain/evolutionUser.entity";
import { CreateController } from 'apps/api/user/create.controller';
import { ArpStudioCreateUserService } from './services/arpstudio/createUser.service';
import { ArpStudioUser } from './entity/createArpStudio.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArpStudioUser]),
        SharedModule,CqrsModule],
    controllers: [CreateController],
    providers: [
        ArpStudioCreateUserService
    ],
})

export class UsersModule {}
