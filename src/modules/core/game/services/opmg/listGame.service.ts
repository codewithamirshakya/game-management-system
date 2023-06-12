import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgGameListInterface } from "../../interface/opmgGamelist.interface";
import { transformData } from "../../transformer/game.trasformer";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";

export class OpmgGameListService {
  constructor(
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService
  ) { }

  async getList(dto: OpmgGameListInterface) {
    const getGameListDto = {
      ...dto,
      host_id: 'SiG',

    };
    const serverResponse = await this.getgameList(getGameListDto);

    if (serverResponse && serverResponse.success == true) {
      const responseData = await serverResponse ? serverResponse.games.map((item) => {
        return this.makeResponseData(item)
      }) : []
      return responseData;
    } else {
      throw new RetreiveGameListFailedException('Game list fetch operation failed.');
    }
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

  makeResponseData(data) {
    return {
      game_name: data.gamename,
      game_desc: data?data.gamedesc:null,
      game_id: data.gameid,
      game_type: data.gametype,
      settings: data,
    }
  }
}