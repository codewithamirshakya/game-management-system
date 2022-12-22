import { Module } from '@nestjs/common';
import { UsersController } from "../../../../apps/api/user/UsersController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/user.entity";
import { TYPES } from "./application/constants/types";
import { GetUserService } from "./application/services/getUser.service";
import { GetUserByIdRepository } from "./infrastructure/persistence/getUserById.repository";
import { CreateUserService } from "./application/services/create.user.service";
import { CreateUserRepository } from "./infrastructure/persistence/create.user.repository";
import { SharedModule } from "../../shared/shared.module";
const getUserService = { provide: TYPES.repository.IGetUserServiceRepositoryInterface, useClass: GetUserByIdRepository };
const createUserRepo = { provide: TYPES.repository.ICreateUserServiceRepositoryInterface, useClass: CreateUserRepository };

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        SharedModule],
    controllers: [UsersController],
    providers: [getUserService, GetUserService, CreateUserService, createUserRepo],
})
export class UsersModule {}
