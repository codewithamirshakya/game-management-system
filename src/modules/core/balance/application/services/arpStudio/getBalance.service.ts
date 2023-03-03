import { GetBalanceDto } from "../../dtos/request/arpStudio/getBalance.dto";
import { GetBalanceDto as DomainGetBalanceDto } from "../../../domain/dto/request/arpStudio/getBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetBalanceRepositoryInterface } from "../../../domain/repository/arpStudio/getBalance.repository.interface";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { RetrieveOperationFailedException } from "../../../domain/exception/retreiveOperationFailed.exception";
import { Request } from "express";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";

export class GetBalanceService {
  constructor(
    @Inject(TYPES.repository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
  ) {}


  public getBalance(dto: GetBalanceDto,req: Request,ip: string) {
    try {

      const response = this.repo.getBalance(new DomainGetBalanceDto(dto));
      //activity completed event dispatch
      this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.ARP_STUDIO,
          ActivityTypeConstant.FUNDS_TRANSFER,
          "[Player balance fetched successfully.]",
          ip,
          req.headers["user-agent"],
        ));

      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }
}