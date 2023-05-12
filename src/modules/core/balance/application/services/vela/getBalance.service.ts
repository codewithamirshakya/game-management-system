import { GetBalanceDto } from "../../dtos/request/vela/getBalance.dto";
import { GetBalanceDto as DomainGetBalanceDto } from "../../../domain/dto/request/vela/getBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetBalanceRepositoryInterface } from "../../../domain/repository/velaGaming/getBalance.repository.interface";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { RetrieveOperationFailedException } from "../../../domain/exception/retreiveOperationFailed.exception";
import { Request } from "express";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { VelaRequestDto } from "@src/modules/core/shared/application/dto/vela.request.dto";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";

export class GetVelaBalanceService {
  constructor(
    // @Inject(TYPES.velaRepository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
    // @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    public apiRequestService: ApiRequestService
  ) {}


  async getBalance(dto: GetBalanceDto,req: Request,ip: string) {
    try {
      const response = await this.getVelaGamingBalance(new DomainGetBalanceDto(dto));
      //activity completed event dispatch
      // this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
      //   new ActivityCompletedEvent(
      //     GameProviderConstant.VELA_GAMING,
      //     ActivityTypeConstant.FUNDS_TRANSFER,
      //     "[Player balance fetched successfully.]",
      //     ip,
      //     req.headers["user-agent"],
      //   ));

      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getVelaGamingBalance(dto: GetBalanceDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/balance'
      })
    }));
  }
}