import { UpdateUserDto } from "../../dtos/request/arpStudio/update.user.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  UpdateUserRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/update.user.repository.interface";
import { UserUpdateFailedException } from "../../../domain/exception/userUpdateFailed.exception";

export class UpdateUserService {
  constructor(
    @Inject(TYPES.repository.UpdateUserRepositoryInterface) private repo: UpdateUserRepositoryInterface,
  ) {}
  public update(updateUserDTO: UpdateUserDto) {
    try {
      const user = this.repo.update(updateUserDTO);
      // update last logged at
      // await this.commandBus.execute(
      //   new UpdateLastLoggedAtCommand(
      //     logoutArpStudioDto.username,
      //     GameProviderConstant.ARP_STUDIO,
      //   )
      // );
      return user;
    } catch (e) {
      throw new UserUpdateFailedException('User update Failed.',e)
    }
  }
}