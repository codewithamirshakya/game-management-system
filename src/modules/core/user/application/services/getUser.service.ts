import { UserDomain } from "../../domain/user.domain";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { IGetUserByIdRepositoryInterface } from "../../domain/repository/intefaces/getUserById.repository.interface";

export class GetUserService {
  constructor(@Inject(TYPES.repository.IGetUserByIdServiceRepositoryInterface) private getUserRepo: IGetUserByIdRepositoryInterface) {}

  getById(id: number): Promise<UserDomain> {
    return this.getUserRepo.getById(id);
  }

}