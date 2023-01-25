import { GetBalanceRepositoryInterface } from "../../../../domain/repository/velaGaming/getBalance.repository.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { CreatePlayerDto } from "../../../../../user/domain/dtos/request/vela/createPlayer.dto";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";

export class GetBalanceRepository implements GetBalanceRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async getBalance(dto: CreatePlayerDto){
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