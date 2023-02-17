import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import {EvolutionRequestDto} from "../../../../../shared/application/dto/evolution.request.dto";
import {
  GetCasinoStateRepositoryInterface
} from "../../../../domain/repository/evolution/getCasinoState.repository.interface";
import {GetCasinoStateDto} from "../../../../domain/dto/request/evolution/getCasinoState.dto";
import {EvolutionConfig} from "../../../../../../../config/evolution.config";


export class GetCasinoStateRepository implements GetCasinoStateRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getState(dto: GetCasinoStateDto, casinoId : string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto,
        endpoint: `/api/lobby/v1/${casinoId}/state`,
        headers: {Authorization : "Basic "+Buffer.from(EvolutionConfig.casinoKey+':'+EvolutionConfig.apiToken).toString('base64')},
      })
    }));
  }
}