import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "@src/modules/core/shared/application/dto/vela.request.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Games } from "../../entity/games.entity";
import { DataSource, Repository } from "typeorm";
import { transformData } from "../../transformer/game.trasformer";

export class VelaListGameService {
  constructor(
    @InjectRepository(Games)
    private readonly repo: Repository<Games>,
    private dataSource: DataSource,
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService
  ) { }

  async getList(hostId?: string) {
    try {
      const dataResponse = await this.repo.find({
        where: {
          game_provider_id: 4,
        },
      });
      if (dataResponse && dataResponse.length > 0) {
        return await transformData(dataResponse);
      } else {
        const serverResponse = await this.getgameList(hostId);
        if (serverResponse && serverResponse.status_code == 0) {
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


  getgameList(hostId: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: { host_id: hostId },
        endpoint: '/user/gamelist'
      })
    }));
  }

  async saveData(data) {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let responseData = [];
      if (data && data.list) {
        responseData = await Promise.all(data.list.map(async (item) => {
          const responseItem = await this.repo.create({
            game_provider_id: 4,
            settings: JSON.stringify(item),
            game_name: item ? item.title.en : null,
            game_desc: item ? item.gamedesc : null,
            game_id: item ? item.game_id : null,
            game_type: item ? item.game_code : null,
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