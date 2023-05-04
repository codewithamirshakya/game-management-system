
import { Inject } from "@nestjs/common";
import { Request } from "express";
import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";
import { EventDefinition } from "src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "src/modules/core/shared/domain/constants/activityType.constant";
import { ArpStudioBalance } from "../../interface/arpStudio.interface";
import { SHARED_TYPES } from "src/modules/shared/application/constants/types";
import { EventDispatcherInterface } from "src/modules/shared/application/EventBus/eventDispatcher.interface";
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";

export class ArpStudioBalanceService {
  constructor(
    // @Inject(TYPES.repository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService

  ) {}


  async getBalance(dto: ArpStudioBalance,req: Request,ip: string) {
    try {

      const response = await this.getBalanceArpStudio(dto);

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

  async getBalanceArpStudio(dto: ArpStudioBalance){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.ARP_STUDIO,
      requestDTO: new ArpStudioRequestDto({
        method: 'GET',
        params: dto,
        endpoint: 'user/balance'
      })
    }));
  }
}