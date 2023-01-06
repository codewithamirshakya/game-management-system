import { UpdateUserDto } from "../../dtos/request/arpStudio/update.user.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  UpdateUserRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/update.user.repository.interface";
import { UserUpdateFailedException } from "../../../domain/exception/userUpdateFailed.exception";
import { Transactional } from "typeorm-transactional";

export class UpdateUserService {
  constructor(
    @Inject(TYPES.repository.UpdateUserRepositoryInterface) private repo: UpdateUserRepositoryInterface,
  ) {}

  @Transactional()
  public update(updateUserDTO: UpdateUserDto) {
    try {
      return this.repo.update(updateUserDTO);
    } catch (e) {
      throw new UserUpdateFailedException('User update Failed.',e)
    }
  }
}