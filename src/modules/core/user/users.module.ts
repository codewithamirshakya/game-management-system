import { Module } from '@nestjs/common';
import { UsersController } from "../../../../apps/api/user/UsersController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/user.entity";
import { TYPES } from "./application/constants/types";
import { GetUserService } from "./application/services/getUser.service";
import { GetUserByIdRepository } from "./infrastructure/persistence/getUserById.repository";
import { CreateUserService } from "./application/services/create.user.service";
import { CreateUserRepository } from "./infrastructure/persistence/create.user.repository";
import { CreateUserRepository as CreateARPStudioUserRepository } from "./infrastructure/persistence/arpStudio/create.user.repository";
import { SharedModule } from "../../shared/shared.module";
import { CreateUserCommandHandler } from "./application/commandBus/create.user.command.handler";
import { ArpStudioUser } from "./domain/arpStudio.user.entity";
const getUserService = { provide: TYPES.repository.IGetUserServiceRepositoryInterface, useClass: GetUserByIdRepository };
const createUserRepo = { provide: TYPES.repository.ICreateUserServiceRepositoryInterface, useClass: CreateUserRepository };
const createArpStudioUserRepo = { provide: TYPES.repository.ICreateArpStudioUserRepositoryInterface, useClass: CreateARPStudioUserRepository };

@Module({
    imports: [TypeOrmModule.forFeature([User,ArpStudioUser]),
        SharedModule],
    controllers: [UsersController],
    providers: [
      getUserService, GetUserService, CreateUserService, createUserRepo, CreateUserCommandHandler,
      createArpStudioUserRepo
    ],
})
export class UsersModule {}
