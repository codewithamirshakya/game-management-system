import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgGameListInterface } from "../../interface/opmgGamelist.interface";
import { transformData } from "../../transformer/game.trasformer";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Games } from "../../entity/games.entity";
import { DataSource, Repository } from "typeorm";

export class OpmgGameListService {
  constructor(
    @InjectRepository(Games)
    private readonly repo: Repository<Games>,
    private dataSource: DataSource,
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService
  ) { }

  async getList(dto: OpmgGameListInterface) {
    try {
      const dataResponse = await this.repo.find({
        where: {
          game_provider_id: 3,
        },
      });
      if (dataResponse && dataResponse.length > 0) {
        return await transformData(dataResponse);
      } else {
        const getGameListDto = {
          ...dto,
          host_id: 'SiG',
        };
        const serverResponse = await this.getgameList(getGameListDto);
        if (serverResponse && serverResponse.success == true) {
          const insertedData = await this.saveData(serverResponse);
          return await transformData(insertedData);
        } else {
          throw new RetreiveGameListFailedException('Game list fetch operation failed.');
        }
      }

    } catch (e) {
      throw new RetreiveGameListFailedException(e, 'Game list fetch operation failed.');

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

  async saveData(data) {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let responseData = [];
      if (data && data.games) {
        responseData = await Promise.all(data.games.map(async (item) => {
          const responseItem = await this.repo.create({
            game_provider_id: 3,
            game_name: item ? item.gamename : null,
            game_desc: item ? item.gamedesc : null,
            game_id: item ? item.gameid : null,
            game_type: item ? item.gametype : null,
            settings: JSON.stringify(item)
          });
          await queryRunner.manager.save(responseItem);
          await queryRunner.commitTransaction();
          return responseItem;
        }));
      }

      return responseData;
    } catch (error) {
      throw new RetreiveGameListFailedException(error);
    }
  }
}