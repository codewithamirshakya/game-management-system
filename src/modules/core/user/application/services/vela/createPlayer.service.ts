import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  CreatePlayerRepositoryInterface
} from "../../../domain/repository/intefaces/vela/createPlayer.repository.interface";
import { Transactional } from "typeorm-transactional";
import { CreatePlayerDto } from "../../dtos/request/vela/createPlayer.dto";
import { CreatePlayerDto as CreatePlayerDomainDto } from "../../../domain/dtos/request/vela/createPlayer.dto";
import { UserCreationFailedException } from "../../../domain/exception/userCreationFailed.exception";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { IsUserExistsQuery } from "../../../../shared/domain/query/user/IsUserExistsQuery";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { CreateUserCommand } from "../../../../shared/domain/command/user/create.user.command";
import { UserAlreadyExistsException } from "../../../domain/exception/userAlreadyExists.exception";

export class CreatePlayerService {
  constructor(
    @Inject(TYPES.velaRepository.CreatePlayerRepositoryInterface) private repo: CreatePlayerRepositoryInterface,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @Transactional()
  public async create(createPlayerDTO: CreatePlayerDto,ip: string) {
    try {
      //check if user exists already
      const isUserExists = await this.queryBus.execute(new IsUserExistsQuery(createPlayerDTO.member_id,
        GameProviderConstant.VELA_GAMING));

      if (!isUserExists) {
        const response = await this.repo.createPlayer(new CreatePlayerDomainDto(createPlayerDTO));
        await this.commandBus.execute(
          new CreateUserCommand(
            {
              username: createPlayerDTO.member_id,
            },
            GameProviderConstant.VELA_GAMING,
            ip)
        );
        return response;
      } else {
        throw new UserAlreadyExistsException();
      }
    } catch (e) {
      throw new UserCreationFailedException('Player creation failed.',e)
    }
  }
}