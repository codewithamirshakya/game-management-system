import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import {EventDefinition} from "../../../../shared/application/constants/eventDefinition";
import {ActivityCompletedEvent} from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";
import {ActivityTypeConstant} from "../../../../shared/domain/constants/activityType.constant";
import {SHARED_TYPES} from "../../../../../shared/application/constants/types";
import {AsyncEventDispatcherInterface} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";
import {GetRenderedResultDto} from "../../dtos/request/evolution/getRenderedResult.dto";
import {
    GetResultByTokenRepositoryInterface
} from "../../../domain/repository/evolution/getResultByToken.repository.interface";
import {FetchOperationFailedException} from "../../../domain/exception/fetchOperationFailed.exception";

export class GetRenderedResultService {
    constructor(
      @Inject(TYPES.evolutionRepository.GetResultByTokenRepositoryInterface) private repo: GetResultByTokenRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    ) {}

    @Transactional()
    public async getRenderedResult(dto:GetRenderedResultDto,req: Request,ip: string) {
        try {
            const response = await this.repo.getResult(dto);

            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.GAME,
                    "[Games result fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new FetchOperationFailedException(e,'Game result fetch operation failed.');
        }
    }

}