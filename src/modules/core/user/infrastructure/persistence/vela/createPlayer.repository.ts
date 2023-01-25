import {
  CreatePlayerRepositoryInterface
} from "../../../domain/repository/intefaces/vela/createPlayer.repository.interface";
import { CreatePlayerDto } from "../../../domain/dtos/request/vela/createPlayer.dto";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../shared/application/dto/vela.request.dto";

export class CreatePlayerRepository implements CreatePlayerRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  async createPlayer(dto: CreatePlayerDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/create'
      })
    }));
  }
}