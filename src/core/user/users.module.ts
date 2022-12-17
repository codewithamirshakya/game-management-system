import { Module } from '@nestjs/common';
import { ARPUsersController } from "../../../apps/api/arpSlot/user/ARPUsersController";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/user.entity";
import { TYPES } from "./application/constants/types";
import { GetUserService } from "./application/services/arpSlot/getUser.service";
import { GetUserByIdRepository } from "./infrastructure/persistence/arpSlot/getUserById.repository";
import { CreateUserService } from "./application/services/arpSlot/create.user.service";
import { CreateUserRepository } from "./infrastructure/persistence/arpSlot/create.user.repository";

const getUserService = { provide: TYPES.repository.IGetARPUserServiceRepositoryInterface, useClass: GetUserByIdRepository };
const createUserRepo = { provide: TYPES.repository.ICreateARPUserServiceRepositoryInterface, useClass: CreateUserRepository };

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [ARPUsersController],
    providers: [getUserService, GetUserService, CreateUserService, createUserRepo],
})
export class UsersModule {}
