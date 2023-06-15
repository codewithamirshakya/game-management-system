import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { Request } from "express";
import { Transactional } from "typeorm-transactional";
import { EvolutionFormatEnum, ListGameDto } from "../../dtos/main/listGame.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Games } from "../../entity/games.entity";
import { transformData } from "../../transformer/game.trasformer";

export class EvolutionListGameService {
  constructor(
    @InjectRepository(Games)
    private readonly repo: Repository<Games>,
    private dataSource: DataSource,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) { }

  public async getActiveGamesList() {
    try {
      const dataResponse = await this.repo.find({
        where: {
          game_provider_id: 2,
        },
      });
      if (dataResponse && dataResponse.length > 0) {
        return await transformData(dataResponse);
      } else {
        const serverResponse = await this.getActiveGamesListData();
        console.log(serverResponse);
        if (serverResponse && serverResponse.length > 0) {
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

  // public async getActiveGamesList() {
  //     // if(dto.withBets) {
  //     //     return await this.getActiveGamesListWithBet(dto.format,req,ip)
  //     // }
  //     // return await this.getActiveGamesListWithClassification()
  //     return await this.getActiveGamesListData()
  // }

  // @Transactional()
  // public async getActiveGamesListWithClassification(format: EvolutionFormatEnum,req: Request,ip: string) {
  //     try {
  //         const response = await this.getGameListWithClassification(format);
  //         return response;
  //     } catch (e) {
  //         throw new RetreiveGameListFailedException(e,'Game list fetch operation failed.');
  //     }
  // }

  public async getActiveGamesListData() {
    try {
      const response = await this.getGameListData();
      return response;
    } catch (e) {
      throw new RetreiveGameListFailedException(e, 'Game list fetch operation failed.');
    }
  }

  @Transactional()
  public async getActiveGamesListWithBet(format: EvolutionFormatEnum, req: Request, ip: string) {
    try {
      const response = await this.getGameListWithBets(format);
      return response;
    } catch (e) {
      throw new RetreiveGameListFailedException(e, 'Bets list fetch operation failed.');
    }
  }


  getGameListData(): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: {},
        // endpoint: '/api/classification/v1/games'+(format === 'plain' ? '/plain' : '')
        endpoint: '/api/classification/v1/games'
      })
    }));
  }
  getGameListWithClassification(format: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: {},
        // endpoint: '/api/classification/v1/games'+(format === 'plain' ? '/plain' : '')
        endpoint: '/games'
      })
    }));
  }

  getGameListWithBets(format: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: {},
        endpoint: '/api/classification/v1/bets' + (format === 'plain' ? '/plain' : '')
      })
    }));
  }

  async saveData(data) {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let responseData = [];
      responseData = await Promise.all(data.map(async (item) => {
        const responseItem = await this.repo.create({
          game_provider_id: 2,
          game_name: item ? item.game ? item.game.name : null : null,
          game_desc: item ? item.gameProvider ? item.gameProvider.name : null : null,
          game_id: item ? item.gameid ? item.gameid : null : null,
          game_type: item ? item.gameType.name : null,
          settings: JSON.stringify(item)
        });
        await queryRunner.manager.save(responseItem);
        await queryRunner.commitTransaction();
        return responseItem;
      }));
      return responseData;
    } catch (error) {
      throw new RetreiveGameListFailedException(error);
    }
  }
}