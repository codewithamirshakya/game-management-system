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

export class ListGameService {
    constructor(
      @Inject(TYPES.evolutionRepository.ListGameRepositoryInterface) private repo: ListGameRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    ) {}

    @Transactional()
    public async getActiveGamesListWithClassification(format: ('plain' | 'object'),req: Request,ip: string) {
        try {
            const response = await this.repo.getGameListWithClassification(format);
            console.log('response',response);
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
            throw new RetreiveGameListFailedException(e,'Bets list fetch operation failed.');
        }
    }

    public async getActiveGamesListWithBet(format: ('plain' | 'object'),req: Request,ip: string) {
        try {
            const response = await this.repo.getGameListWithBets(format);
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
}