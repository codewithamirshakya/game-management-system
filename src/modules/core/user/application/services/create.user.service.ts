import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { ICreateUserRepositoryInterface } from "../../domain/repository/intefaces/createUser.repository.interface";

export class CreateUserService {
  constructor(
    @Inject(TYPES.repository.ICreateUserServiceRepositoryInterface) private getUserRepo: ICreateUserRepositoryInterface,
    ) {}
}