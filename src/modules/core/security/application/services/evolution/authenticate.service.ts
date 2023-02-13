import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { AuthenticateRepositoryInterface } from "../../../domain/repository/evolution/authenticate.repository.interface";
import { AuthenticateDto } from "../../dto/request/evolution/authenticate.dto";
import { AuthenticateDto as DomainAuthenticateDTO } from "../../../domain/dto/request/evolution/authenticate.dto";
import { Transactional } from "typeorm-transactional";
import {
  UserAuthenticationFailedException
} from "../../../domain/exception/evolution/userAuthenticationFailed.exception";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../../../shared/domain/command/user/create.user.command";
import { IsUserExistsQuery } from "../../../../shared/domain/query/user/IsUserExistsQuery";
import {AsyncEventDispatcherInterface} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";

export class AuthenticateService {
  constructor(
    @Inject(TYPES.evolutionRepository.AuthenticateRepositoryInterface) private repo: AuthenticateRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @Transactional()
  async authenticate(dto: AuthenticateDto,req,ip: string) {
    try {
      //check if user exists already
      const isUserExists = await this.queryBus.execute(new IsUserExistsQuery(dto.player.id,
        GameProviderConstant.EVOLUTION));
      
      const response = await this.repo.authenticate(new DomainAuthenticateDTO(dto));

      if (!isUserExists) {
        await this.commandBus.execute(
          new CreateUserCommand(
            {
              username: dto.player.id,
              currency: dto.player.currency,
              country: dto.player.country,
              uid: response.uid
            },
            GameProviderConstant.EVOLUTION,
            ip)
        );
      }
      //activity completed event dispatch
      await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.EVOLUTION,
          ActivityTypeConstant.SECURITY,
          "[Evolution user authenticated successfully.]",
          ip,
          req.headers["user-agent"],
        ));

      return response.authenticateResponse;
    } catch (e) {
      throw new UserAuthenticationFailedException(e);
    }
  }
}