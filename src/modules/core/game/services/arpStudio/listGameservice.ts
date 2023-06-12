import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "@src/modules/core/common/service/arpStudio.request.service";
import { Request } from "express";
import { ListGameLobbyDto } from "../../dtos/arpStudio/listGameLobby.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { GameListInterface } from "../../interface/arpstudioGamelist.interface";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { transformData } from "../../transformer/game.trasformer";
export class ArpStudioListGameService {
  constructor(
    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService
  ) { }

  async getArpStudioGameList(dto: ListGameLobbyDto, req: Request, ip: string) {
    try {
      const response = await this.getArpStudioGamesList(dto);
      if (response && response.result == 0) {
        const responseData = await response ? response.array.map((item) => {
          return this.makeResponseData(item)
        }) : []
        return responseData;
      } else {
        throw new RetreiveGameListFailedException('Game list fetch operation failed.');
      }
    } catch (e) {
      throw new RetreiveGameListFailedException(e, 'Game list fetch operation failed.');
    }
  }


  getArpStudioGamesList(dto: GameListInterface): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/client/game/lobby'
    }));
  }

  makeResponseData(data) {
    console.log(data)
    return {
      game_name: data.gametitle,
      game_type: data.gametype,
      game_desc: data?data.gamedesc:null,
      game_id: data.gameid,
      // settings: data,

    }
  }
}