import { LoginArpStudioDto } from "../../dto/request/login.arpStudio.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { LoginRepositoryInterface } from "../../../domain/repository/login.repository.interface";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../../../shared/domain/command/user/create.user.command";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { LoginFailedException } from "../../../domain/exception/loginFailed.exception";
import { Transactional } from "typeorm-transactional";
import { IsUserExistsQuery } from "../../../../shared/domain/query/user/IsUserExistsQuery";

export class LoginService {
  constructor(
    @Inject(TYPES.repository.LoginRepositoryInterface) private loginRepo: LoginRepositoryInterface,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @Transactional()
  async login(loginArpStudioDto: LoginArpStudioDto,ip){
    try {
      const user = this.loginRepo.arpSlotLogin(loginArpStudioDto);

      //check if user exists already
      const isUserExists = await this.queryBus.execute(new IsUserExistsQuery(loginArpStudioDto.username,
        GameProviderConstant.ARP_STUDIO));

      if (!isUserExists) {
        await this.commandBus.execute(
          new CreateUserCommand(
            {
              username: loginArpStudioDto.username,
              nickname: loginArpStudioDto.nickname,
            },
            GameProviderConstant.ARP_STUDIO,
            ip)
        );
      }
      return user;
    } catch (e) {
      throw new LoginFailedException('Login Failed.',e)
    }
  }

}