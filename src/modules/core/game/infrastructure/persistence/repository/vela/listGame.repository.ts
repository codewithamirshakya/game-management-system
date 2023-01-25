import { Inject } from "@nestjs/common";
import { ListGameRepositoryInterface } from "../../../../domain/repository/vela/listGame.repository.interface";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";


export class ListGameRepository implements ListGameRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getList(hostId: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: { host_id: hostId },
        endpoint: '/user/gamelist'
      })
    }));
  }
}