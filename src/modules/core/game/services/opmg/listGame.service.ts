import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgGameListInterface } from "../../interface/opmgGamelist.interface";

export class OpmgGameListService {
  constructor(
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService
  ) { }

  async getList(dto: OpmgGameListInterface) {
    const getGameListDto = {
      ...dto,
      host_id: 'SiG',

    };
    return await this.getgameList(getGameListDto);
  }

  async getgameList(dto: OpmgGameListInterface): Promise<any> {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.OPMG,
      requestDTO: new OpmgDto({
        method: 'GET',
        params: dto,
        endpoint: 'platform_game_list'
      })
    }));
  }
}