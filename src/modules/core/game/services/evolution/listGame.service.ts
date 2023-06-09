import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import { EvolutionFormatEnum, ListGameDto } from "../../dtos/main/listGame.dto";
import { RetreiveGameListFailedException } from "../../exception/retreiveGameListFailed.exception";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";

export class EvolutionListGameService {
    constructor(
      @Inject(ApiRequestService)
       public apiRequestService: ApiRequestService
    ) {}

    public async getActiveGamesList() {
        // if(dto.withBets) {
        //     return await this.getActiveGamesListWithBet(dto.format,req,ip)
        // }
        // return await this.getActiveGamesListWithClassification()
        return await this.getActiveGamesListData()
    }

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
            throw new RetreiveGameListFailedException(e,'Game list fetch operation failed.');
        }
    }

    @Transactional()
    public async getActiveGamesListWithBet(format: EvolutionFormatEnum,req: Request,ip: string) {
        try {
            const response = await this.getGameListWithBets(format);
            return response;
        } catch (e) {
            throw new RetreiveGameListFailedException(e,'Bets list fetch operation failed.');
        }
    }


    getGameListData(): Promise<any> {
      return this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.EVOLUTION,
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
        gameProvider : GameProviderConstant.EVOLUTION,
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
        gameProvider : GameProviderConstant.EVOLUTION,
        requestDTO: new EvolutionRequestDto({
          method: 'GET',
          params: {},
          endpoint: '/api/classification/v1/bets'+(format === 'plain' ? '/plain' : '')
        })
      }));
    }
}