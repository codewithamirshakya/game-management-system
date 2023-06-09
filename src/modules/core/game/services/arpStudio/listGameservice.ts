import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "@src/modules/core/common/service/arpStudio.request.service";
import { Request } from "express";
import { ListGameLobbyDto } from "../../dtos/arpStudio/listGameLobby.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { GameListInterface } from "../../interface/arpstudioGamelist.interface";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";

export class ArpStudioListGameService {
    constructor(
      @Inject(ArpStudioRequestService)
      public arpStudioRequestService: ArpStudioRequestService
    ) {}

     async getArpStudioGameList(dto: ListGameLobbyDto,req: Request,ip: string) {
        try {
            const response = await this.getArpStudioGamesList(dto);
            return response;
        } catch (e) {
            throw new RetreiveGameListFailedException(e,'Game list fetch operation failed.');
        }
    }


    getArpStudioGamesList(dto: GameListInterface): Promise<any> {
      return this.arpStudioRequestService.request(new ArpStudioRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/client/game/lobby'
      }));
    }
}