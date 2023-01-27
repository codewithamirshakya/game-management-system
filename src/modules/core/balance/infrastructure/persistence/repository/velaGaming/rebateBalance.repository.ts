import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  RebateBalanceRepositoryInterface
} from "../../../../domain/repository/velaGaming/rebateBalance.repository.interface";
import { RebateBalanceDto } from "../../../../domain/dto/request/vela/rebateBalance.dto";

export class RebateBalanceRepository implements RebateBalanceRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async rebate(dto: RebateBalanceDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/claim-rebate'
      })
    }));
  }
}