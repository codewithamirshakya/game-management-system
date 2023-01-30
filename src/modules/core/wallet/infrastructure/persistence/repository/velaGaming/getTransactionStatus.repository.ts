import {
  GetTransactionStatusRepositoryInterface
} from "../../../../domain/repository/velaGaming/getTransactionStatus.repository.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import { GetTransactionStatusDto } from "../../../../domain/dtos/request/vela/getTransactionStatusDto";

export class GetTransactionStatusRepository implements GetTransactionStatusRepositoryInterface {
  @Inject(ApiRequestService)
  private apiRequestService: ApiRequestService

  async getTransactionStatus(dto: GetTransactionStatusDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/wallet-trans-status'
      })
    }));
  }
}