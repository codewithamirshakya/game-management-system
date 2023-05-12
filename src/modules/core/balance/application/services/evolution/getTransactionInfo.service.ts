import { FundRepositoryInterface } from '../../../domain/repository/evolution/fund.repository.interface';
import { RetrieveOperationFailedException } from '../../../domain/exception/retreiveOperationFailed.exception';
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { Transactional } from "typeorm-transactional";
import { EventDefinition } from "@src/modules/core/shared/application/constants/eventDefinition";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { Request } from 'express';
import {GetTransactionInfoDto} from "../../dtos/request/evolution/getTransactionInfo.dto";
import {GetTransactionInfoDomainDto} from "../../../domain/dto/request/evolution/getTransactionInfoDomain.dto";
import {IsUserExistsValidationService} from "../validation/IsUserExistsValidation.service";
import {
  IsUserExistsValidationService as EvolutionIsUserExistsValidationService
} from "../validation/evolution/IsUserExistsValidation.service";

export class GetTransactionInfoService {
  constructor(
    @Inject(TYPES.evolutionRepository.FundRepositoryInterface) private repo: FundRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    private userExistsValidationService: IsUserExistsValidationService,
    private evolutionUserExistsValidationService: EvolutionIsUserExistsValidationService,
  ) {}


  @Transactional()
  async getTransactionInfo(dto: GetTransactionInfoDto,req: Request,ip: string) {
    let userId;
    if(dto.euID) {
      const user = await this.userExistsValidationService.isUserExists(dto.euID, GameProviderConstant.EVOLUTION);
      userId = user.id;
    } else {
      const user = await this.evolutionUserExistsValidationService.isUserExists(dto.uID);
      userId = user.userId;
    }
    try {
      const response = this.repo.request(new GetTransactionInfoDomainDto(dto));
      //activity completed event dispatch
      this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.EVOLUTION,
          ActivityTypeConstant.FUNDS_TRANSFER,
          "[Transaction information fetched successfully.]",
          ip,
          req.headers["user-agent"],
            userId
        ));

      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e, ' Transaction fetch information failed.');
    }
  }
}