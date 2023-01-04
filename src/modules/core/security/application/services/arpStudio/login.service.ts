import { LoginArpStudioDto } from "../../dto/request/login.arpStudio.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { LoginRepositoryInterface } from "../../../domain/repository/login.repository.interface";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../../../shared/domain/command/user/create.user.command";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { LoginFailedException } from "../../../domain/exception/loginFailed.exception";
import { Transactional } from "typeorm-transactional";

export class LoginService {
  constructor(
    @Inject(TYPES.repository.LoginRepositoryInterface) private loginRepo: LoginRepositoryInterface,
    private commandBus: CommandBus
  ) {}

  @Transactional()
  async login(loginArpStudioDto: LoginArpStudioDto){
    try {
      const user = this.loginRepo.arpSlotLogin(loginArpStudioDto);
      await this.commandBus.execute(
        new CreateUserCommand(
          { username: loginArpStudioDto.username,
                  nickname: loginArpStudioDto.nickname},
         GameProviderConstant.ARP_STUDIO)
      );
      return user;
    } catch (e) {
      throw new LoginFailedException('Login Failed.',e)
    }
  }

}