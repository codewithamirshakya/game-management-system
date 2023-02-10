import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../../shared/domain/command/user/create.user.command";
import { GameProviderConstant } from "../../../shared/application/constants/gameProvider.constant";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { ICreateUserRepositoryInterface } from "../../domain/repository/intefaces/createUser.repository.interface";
import { CreateUserDto } from "../../domain/dtos/request/create.user.dto";
import { CreateUserDto as CreateArpStudioUserDto } from "../../domain/dtos/request/arpStudio/create.user.dto";
import {
  ICreateArpStudioUserRepositoryInterface
} from "../../domain/repository/intefaces/arpStudio/createUser.repository.interface";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand>{
  constructor(
    @Inject(TYPES.repository.ICreateUserServiceRepositoryInterface) private userRepo: ICreateUserRepositoryInterface,
    @Inject(TYPES.repository.ICreateArpStudioUserRepositoryInterface) private arpStudioUserRepo: ICreateArpStudioUserRepositoryInterface,
  ) {
  }
  async execute(command: CreateUserCommand) {
    switch (command.gameProvider) {
      //arp studio
      case GameProviderConstant.ARP_STUDIO: {
        const user = await this.userRepo.create(new CreateUserDto(
          command.userData.username,
          command.gameProvider,
          command.ipAddress
        ));

        await this.arpStudioUserRepo.create(new CreateArpStudioUserDto(
          {
            user_id: user.id,
            username: user.username,
            nickname: command.userData.nickname
          }
        ))
        break;
      }

      // vela gaming
      case GameProviderConstant.VELA_GAMING: {
          const user = await this.userRepo.create(new CreateUserDto(
            command.userData.username,
            command.gameProvider,
            command.ipAddress
          ));

          // await this.arpStudioUserRepo.create(new CreateArpStudioUserDto(
          //   {
          //     user_id: user.id,
          //     username: user.username,
          //     nickname: command.userData.nickname
          //   }
          // ))
          break;
      }

      // evolution
      case GameProviderConstant.EVOLUTION: {
        const user = await this.userRepo.create(new CreateUserDto(
          command.userData.username,
          command.gameProvider,
          command.ipAddress
        ));

        await this.arpStudioUserRepo.create(new CreateArpStudioUserDto(
          {
            user_id: user.id,
            username: user.username,
            nickname: command.userData.nickname
          }
        ))
        break;
    }

      default:
    }

  }

}