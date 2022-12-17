import { UserDomain } from "../../../domain/user.domain";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { CreateUserDto } from "../../dtos/request/arpSlot/create.user.dto";
import {
  ICreateARPUserRepositoryInterface
} from "../../../domain/repository/arpSlot/createARPUser.repository.interface";

export class CreateUserService {
  constructor(@Inject(TYPES.repository.ICreateARPUserServiceRepositoryInterface) private getUserRepo: ICreateARPUserRepositoryInterface) {}

  create(data: CreateUserDto): Promise<UserDomain> {
    return this.getUserRepo.create(data);
  }

}