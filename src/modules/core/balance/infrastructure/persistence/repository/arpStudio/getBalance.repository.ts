import { GetBalanceRepositoryInterface } from "../../../../domain/repository/arpStudio/getBalance.repository.interface";
import { GetBalanceDto } from "../../../../domain/dto/request/arpStudio/getBalance.dto";
import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { DepositBalanceDto } from "../../../../domain/dto/request/vela/depositBalance.dto";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";

export class GetBalanceRepository implements GetBalanceRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async getBalance(dto: GetBalanceDto){
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