import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  DepositBalanceRepositoryInterface
} from "../../../../domain/repository/velaGaming/depositBalance.repository.interface";
import { DepositBalanceDto } from "../../../../domain/dto/request/vela/depositBalance.dto";

export class DepositBalanceRepository implements DepositBalanceRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async deposit(dto: DepositBalanceDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/deposit-v2'
      })
    }));
  }
}