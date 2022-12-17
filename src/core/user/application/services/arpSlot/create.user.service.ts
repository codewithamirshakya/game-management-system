import { IGetARPUserRepositoryInterface } from "../../../domain/repository/arpSlot/getARPUser.repository.interface";
import { UserDomain } from "../../../domain/user.domain";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";

export class GetUserService {
  constructor(@Inject(TYPES.repository.IGetARPUserServiceRepositoryInterface) private getUserRepo: IGetARPUserRepositoryInterface) {}

  getById(id: string): Promise<UserDomain> {
    return this.getUserRepo.getById(id);
  }

}