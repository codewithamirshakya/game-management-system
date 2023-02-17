import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import {EvolutionRequestDto} from "../../../../../shared/application/dto/evolution.request.dto";
import {GetRenderedResultDto} from "../../../../domain/dto/request/evolution/getRenderedResult.dto";
import {
  GetResultByTokenRepositoryInterface
} from "../../../../domain/repository/evolution/getResultByToken.repository.interface";


export class GetResultByTokenRepository implements GetResultByTokenRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getResult(dto: GetRenderedResultDto): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto.gameHeader ? {gameHeader: dto.gameHeader} : {},
        endpoint: `/api/render/v1/html/${dto.token}`
      })
    }));
  }
}