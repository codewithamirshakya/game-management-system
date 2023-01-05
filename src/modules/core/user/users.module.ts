import { Module } from '@nestjs/common';
import { UsersController } from "../../../../apps/api/arpStudio/user/UsersController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/user.entity";
import { GetUserService } from "./application/services/getUser.service";
import { CreateUserService } from "./application/services/create.user.service";

import { SharedModule } from "../../shared/shared.module";
import { CreateUserCommandHandler } from "./application/commandBus/create.user.command.handler";
import { ArpStudioUser } from "./domain/arpStudio.user.entity";
import { DependenciesConstants } from "./dependencies";
import { IsUserExistsQueryHandler } from "./application/queryBus/IsUserExistsQueryHandler";
import { UpdateLastLoggedAtCommandHandler } from "./application/commandBus/updateLastLoggedAt.command.handler";
import { UpdateUserService } from "./application/services/arpStudio/update.user.service";
import { UpdateController } from "../../../../apps/api/arpStudio/user/update.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User,ArpStudioUser]),
        SharedModule],
    controllers: [UsersController, UpdateController],
    providers: [
          ...DependenciesConstants,
          GetUserService, CreateUserService,
          UpdateUserService,
          CreateUserCommandHandler,
          IsUserExistsQueryHandler,
          UpdateLastLoggedAtCommandHandler
    ],
})

export class UsersModule {}
