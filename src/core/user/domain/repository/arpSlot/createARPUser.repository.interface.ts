import { ICreateUserRepositoryInterface } from "../intefaces/createUser.repository.interface";
import { UserDomain } from "../../user.domain";
import { CreateUserDto } from "../../dtos/request/create.user.dto";

export interface ICreateARPUserRepositoryInterface extends ICreateUserRepositoryInterface {
  create(data: CreateUserDto): Promise<UserDomain>;
}
