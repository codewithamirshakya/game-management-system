import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { CommandBus } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";
import { LogoutArpStudioDto } from "../../dto/request/logout.arpStudio.dto";
import { LogoutRepositoryInterface } from "../../../domain/repository/logout.repository.interface";
import { LogoutFailedException } from "../../../domain/exception/logoutFailed.exception";
import { UpdateLastLoggedAtCommand } from "../../../../shared/domain/command/user/update.lastLoggedAt.command";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";

export class LogoutService {
  constructor(
    @Inject(TYPES.repository.LogoutRepositoryInterface) private repo: LogoutRepositoryInterface,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  async logout(logoutArpStudioDto: LogoutArpStudioDto){
    try {
      const user = this.repo.arpStudioLogout(logoutArpStudioDto);
      // update last logged at
      await this.commandBus.execute(
        new UpdateLastLoggedAtCommand(
          logoutArpStudioDto.username,
          GameProviderConstant.ARP_STUDIO,
        )
      );
      return user;
    } catch (e) {
      throw new LogoutFailedException('Logout Failed.',e)
    }
  }

}