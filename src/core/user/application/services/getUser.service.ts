import { UserDomain } from "../../domain/user.domain";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { IGetUserRepositoryInterface } from "../../domain/repository/intefaces/getUser.repository.interface";

export class GetUserService {
  constructor(@Inject(TYPES.repository.IGetUserServiceRepositoryInterface) private getUserRepo: IGetUserRepositoryInterface) {}

  getById(id: string): Promise<UserDomain> {
    return this.getUserRepo.getById(id);
  }

}