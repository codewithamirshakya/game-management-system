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
import {FetchOperationFailedException} from "../../../domain/exception/fetchOperationFailed.exception";
import {
    GetCasinoStateRepositoryInterface
} from "../../../domain/repository/evolution/getCasinoState.repository.interface";
import {GetCasinoStateDto} from "../../dtos/request/evolution/getCasinoState.dto";
import {GetCasinoStateDto as DomainGetCasinoStateDto} from "../../../domain/dto/request/evolution/getCasinoState.dto";

export class GetCasinoLobbyStateService {
    constructor(
      @Inject(TYPES.evolutionRepository.GetCasinoStateRepositoryInterface) private repo: GetCasinoStateRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    ) {}

    @Transactional()
    public async getState(dto:GetCasinoStateDto,req: Request,ip: string) {
        try {
            const response = await this.repo.getState(new DomainGetCasinoStateDto(dto),dto.casinoId);

            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.LOBBY,
                    "[Casino lobby state fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new FetchOperationFailedException(e,'Casino lobby state fetch operation failed.');
        }
    }

}