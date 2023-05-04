
import { Inject } from "@nestjs/common";
import { Request } from "express";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { VelaRequestDto } from "src/modules/core/shared/application/dto/vela.request.dto";
import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { VelaBalanceInterface } from "../../interface/getBalanceVela.interface";
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";

export class GetVelaBalanceService {
  constructor(
    // @Inject(TYPES.velaRepository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
    // @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    
    @Inject(ApiRequestService)
     public apiRequestService: ApiRequestService
  ) {}


  async getBalance(dto: VelaBalanceInterface,req: Request,ip: string) {
    try {
      const response = await this.getVelaGamingBalance(dto);
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

  async getVelaGamingBalance(dto: VelaBalanceInterface){
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