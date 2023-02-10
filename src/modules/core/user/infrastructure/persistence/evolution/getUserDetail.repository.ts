import { Inject } from "@nestjs/common";
import { EvolutionRequestDto } from "src/modules/core/shared/application/dto/evolution.request.dto";
import {
  GetUserDetailRepositoryInterface
} from "../../../domain/repository/intefaces/evolution/getUserDetail.repository.interface";
import {ApiRequestService} from "../../../../shared/application/service/apiRequest.service";
import {ApiRequestDto} from "../../../../shared/application/dto/apiRequest.dto";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";

export class GetUserDetailRepository implements GetUserDetailRepositoryInterface{

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async get(dto: any){
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