import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { AuthenticateRepositoryInterface } from "../../../domain/repository/evolution/authenticate.repository.interface";
import { AuthenticateDto } from "../../dto/request/evolution/authenticate.dto";
import { AuthenticateDto as DomainAuthenticateDTO } from "../../../domain/dto/request/evolution/authenticate.dto";
import { Transactional } from "typeorm-transactional";
import {
  UserAuthenticationFailedException
} from "../../../domain/exception/evolution/userAuthenticationFailed.exception";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";

export class AuthenticateService {
  constructor(
    @Inject(TYPES.evolutionRepository.AuthenticateRepositoryInterface) private repo: AuthenticateRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
  ) {}

  @Transactional()
  async authenticate(dto: AuthenticateDto,req,ip: string) {
    try {
      const response = this.repo.authenticate(new DomainAuthenticateDTO(dto));
      //activity completed event dispatch
      this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.EVOLUTION,
          ActivityTypeConstant.SECURITY,
          "[Evolution user authenticated successfully.]",
          ip,
          req.headers["user-agent"],
        ));

      return response;
    } catch (e) {
      throw new UserAuthenticationFailedException(e);
    }
  }
}