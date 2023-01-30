import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  ListAllRebateTransactionRepositoryInterface
} from "../../../../domain/repository/velaGaming/listAllRebateTransaction.repository.interface";
import { ListAllRebateTransactionDto } from "../../../../domain/dto/request/vela/listAllRebateTransaction.dto";

export class ListAllRebateTransactionRepository implements ListAllRebateTransactionRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async listAll(dto: ListAllRebateTransactionDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/player-rebate-transaction'
      })
    }));
  }
}