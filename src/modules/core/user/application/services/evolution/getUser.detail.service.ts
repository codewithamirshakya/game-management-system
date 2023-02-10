import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
    GetUserDetailRepositoryInterface
} from "../../../domain/repository/intefaces/evolution/getUserDetail.repository.interface";
import {Request} from "express";
import {DetailDto} from "../../dtos/request/evolution/detail.dto";
import {DetailDto as DomainDetailDto} from "../../../domain/dtos/request/evolution/detail.dto";
import {Transactional} from "typeorm-transactional";
import {EventDefinition} from "../../../../shared/application/constants/eventDefinition";
import {ActivityCompletedEvent} from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";
import {ActivityTypeConstant} from "../../../../shared/domain/constants/activityType.constant";
import {SHARED_TYPES} from "../../../../../shared/application/constants/types";
import {EventDispatcherInterface} from "../../../../../shared/application/EventBus/eventDispatcher.interface";
import {UserFetchFailedException} from "../../../domain/exception/userFetchFailed.exception";

export class GetUserDetailService {
    constructor(
      @Inject(TYPES.evolutionRepository.GetUserDetailRepositoryInterface) private repo: GetUserDetailRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    ) {}

    @Transactional()
    async getDetail(dto: DetailDto,req: Request,ip: string) {
        try {
            const response = this.repo.get(new DomainDetailDto(dto));

            //activity completed event dispatch
            this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.FUNDS_TRANSFER,
                    "[Player information fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new UserFetchFailedException(e);
        }
    }
}