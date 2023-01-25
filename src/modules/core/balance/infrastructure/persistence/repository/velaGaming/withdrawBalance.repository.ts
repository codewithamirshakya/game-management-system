import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  WithdrawBalanceRepositoryInterface
} from "../../../../domain/repository/velaGaming/withdrawBalance.repository.interface";
import { WithdrawBalanceDto } from "../../../../domain/dto/request/vela/withdrawBalance.dto";

export class WithdrawBalanceRepository implements WithdrawBalanceRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async withdraw(dto: WithdrawBalanceDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/withdraw-v2'
      })
    }));
  }
}