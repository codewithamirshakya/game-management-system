import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  GetRebateWalletBalanceRepositoryInterface
} from "../../../../domain/repository/velaGaming/getRebateWalletBalance.repository.interface";
import { GetRebateWalletDto } from "../../../../domain/dto/request/vela/getRebateWallet.dto";

export class GetRebateWalletBalanceRepository implements GetRebateWalletBalanceRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async get(dto: GetRebateWalletDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/player-wallet-balance'
      })
    }));
  }
}