import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "@src/modules/core/common/service/arpStudio.request.service";
import { Request } from "express";
import { ListGameLobbyDto } from "../../dtos/arpStudio/listGameLobby.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { GameListInterface } from "../../interface/arpstudioGamelist.interface";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { transformData } from "../../transformer/game.trasformer";
import { InjectRepository } from "@nestjs/typeorm";
import { Games } from "../../entity/games.entity";
import { DataSource, Repository } from "typeorm";
export class ArpStudioListGameService {
  constructor(
    @InjectRepository(Games)
    private readonly repo: Repository<Games>,
    private dataSource: DataSource,
    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService
  ) { }

  async getArpStudioGameList(dto: ListGameLobbyDto, req: Request, ip: string) {
    try {
      const dataResponse = await this.repo.find({
        where: {
          game_provider_id: 1,
        },
      });
      if (dataResponse) {
        return await transformData(dataResponse);
      } else {
        const response = await this.getArpStudioGamesList(dto);
        if (response && response.result == 0) {
          const insertedData = await this.saveData(response);
          return await transformData(insertedData);
        } else {
          throw new RetreiveGameListFailedException('Game list fetch operation failed.');
        }
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

  async saveData(data) {
    try {
      let responseData = [];
      if (data && data.array) {
        responseData = await Promise.all(data.array.map(async (item) => {
          const responseItem = await this.repo.create({
            game_name: item.gametitle,
            game_type: item ? item.gametype : null,
            game_provider_id: 1,
            game_id: item ? item.gameid : null,
            game_desc: item ? item.gametitle : null,
            settings: JSON.stringify(item)
          });
          await this.repo.save(responseItem);
          return responseItem;
        }));
      }

      return responseData;
    } catch (error) {
      throw new RetreiveGameListFailedException(error);
    }
  }

}