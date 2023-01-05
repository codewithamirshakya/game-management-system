import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GameProviderConstant } from "../../../shared/application/constants/gameProvider.constant";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { UpdateLastLoggedAtCommand } from "../../../shared/domain/command/user/update.lastLoggedAt.command";
import {
  UpdateLastLoggedAtRepositoryInterface
} from "../../domain/repository/intefaces/update.lastLoggedAt.repository.interface";

@CommandHandler(UpdateLastLoggedAtCommand)
export class UpdateLastLoggedAtCommandHandler implements ICommandHandler<UpdateLastLoggedAtCommand>{
  constructor(
    @Inject(TYPES.repository.UpdateLastLoggedAtRepositoryInterface) private userRepo: UpdateLastLoggedAtRepositoryInterface,
  ) {
  }
  async execute(command: UpdateLastLoggedAtCommand) {
    switch (command.gameProvider) {
      case GameProviderConstant.ARP_STUDIO: { // for arp studio
         await this.userRepo.update(
          command.username,
          command.gameProvider,
        );
        break;
      }

      default:
    }

  }

}