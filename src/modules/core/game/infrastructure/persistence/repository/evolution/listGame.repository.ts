import { Inject } from "@nestjs/common";
import { ListGameRepositoryInterface } from "../../../../domain/repository/evolution/listGame.repository.interface";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import {EvolutionRequestDto} from "../../../../../shared/application/dto/evolution.request.dto";


export class ListGameRepository implements ListGameRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getGameListWithClassification(format: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: {},
        endpoint: '/api/classification/v1/games'+(format === 'plain' ? '/plain' : '')
      })
    }));
  }

  getGameListWithBets(format: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: {},
        endpoint: '/api/classification/v1/bets'+(format === 'plain' ? '/plain' : '')
      })
    }));
  }
}