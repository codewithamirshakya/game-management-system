import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import {EvolutionRequestDto} from "../../../../../shared/application/dto/evolution.request.dto";
import {
  GetResultByGameIdRepositoryInterface
} from "../../../../domain/repository/evolution/getResultByGameId.repository.interface";
import {GetRenderedResultByGameIDDto} from "../../../../domain/dto/request/evolution/getRenderedResultByGameID.dto";


export class GetResultByGameIdRepository implements GetResultByGameIdRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getResult(dto: GetRenderedResultByGameIDDto): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto,
        endpoint: `/api/render/v1/details`
      })
    }));
  }
}