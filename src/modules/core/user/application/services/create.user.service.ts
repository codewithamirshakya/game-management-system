import { UserDomain } from "../../domain/user.domain";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { CreateUserDto } from "../dtos/request/create.user.dto";
import { CreateUserDto as CreateUserDTODomain } from "../../domain/dtos/request/create.user.dto";
import { ICreateUserRepositoryInterface } from "../../domain/repository/intefaces/createUser.repository.interface";

export class CreateUserService {
  constructor(
    @Inject(TYPES.repository.ICreateUserServiceRepositoryInterface) private getUserRepo: ICreateUserRepositoryInterface,
    // @Inject('TransactionalInterface') private transactionalInterface: TransactionalInterface,
    ) {}

  async create(data: CreateUserDto): Promise<UserDomain> {
      const userDto = new CreateUserDTODomain(data.username, data.gameProvider);
      return this.getUserRepo.create(userDto)
  }
}