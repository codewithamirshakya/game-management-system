import { FundRepositoryInterface } from "../../../../domain/repository/evolution/fund.repository.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { EvolutionRequestDto } from "@src/modules/core/shared/application/dto/evolution.request.dto";

export class FundRepository implements FundRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async request(dto: any){
    console.log('fund dto', dto);
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/api/ecashier'
      })
    }));
  }
}