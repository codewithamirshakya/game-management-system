import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { ListGameRepositoryInterface } from "../../../domain/repository/evolution/listGame.repository.interface";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import {EventDefinition} from "../../../../shared/application/constants/eventDefinition";
import {ActivityCompletedEvent} from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";
import {ActivityTypeConstant} from "../../../../shared/domain/constants/activityType.constant";
import {SHARED_TYPES} from "../../../../../shared/application/constants/types";
import {RetreiveGameListFailedException} from "../../../domain/exception/retreiveGameListFailed.exception";
import {AsyncEventDispatcherInterface} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";
import { EvolutionFormatEnum, ListGameDto } from "../../dtos/request/main/listGame.dto";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/shared/application/dto/evolution.request.dto";

export class EvolutionListGameService {
    constructor(
    //   @Inject(TYPES.evolutionRepository.ListGameRepositoryInterface) private repo: ListGameRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
      @Inject(ApiRequestService)  public apiRequestService: ApiRequestService
    ) {}

    public async getActiveGamesList(dto: ListGameDto,req: Request,ip: string) {
        if(dto.withBets) {
            return await this.getActiveGamesListWithBet(dto.format,req,ip)
        }
        return await this.getActiveGamesListWithClassification(dto.format,req,ip)
    }

    @Transactional()
    public async getActiveGamesListWithClassification(format: EvolutionFormatEnum,req: Request,ip: string) {
        try {
            const response = await this.getGameListWithClassification(format);
            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.GAME,
                    "[Games list fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new RetreiveGameListFailedException(e,'Game list fetch operation failed.');
        }
    }

    @Transactional()
    public async getActiveGamesListWithBet(format: EvolutionFormatEnum,req: Request,ip: string) {
        try {
            const response = await this.getGameListWithBets(format);
            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.GAME,
                    "[Games with bets list fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new RetreiveGameListFailedException(e,'Bets list fetch operation failed.');
        }
    }



    getGameListWithClassification(format: string): Promise<any> {
      return this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.EVOLUTION,
        requestDTO: new EvolutionRequestDto({
          method: 'GET',
          params: {},
          endpoint: '/api/classification/v1/games'+(format === 'plain' ? '/plain' : '')
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