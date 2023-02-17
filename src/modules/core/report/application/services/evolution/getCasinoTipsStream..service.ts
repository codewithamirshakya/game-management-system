import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetReportRepositoryInterface } from "../../../domain/repository/evolution/getReport.repository.interface";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import {EventDefinition} from "../../../../shared/application/constants/eventDefinition";
import {ActivityCompletedEvent} from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";
import {ActivityTypeConstant} from "../../../../shared/domain/constants/activityType.constant";
import {SHARED_TYPES} from "../../../../../shared/application/constants/types";
import {FetchReportFailedException} from "../../../domain/exception/fetchReportFailed.exception";
import {AsyncEventDispatcherInterface} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";
import {GetCasinoDailyReportTipsDto} from "../../dtos/request/evolution/getCasinoDailyReportTips.dto";

export class GetCasinoTipsStreamService {
    constructor(
      @Inject(TYPES.evolutionRepository.GetReportRepositoryInterface) private repo: GetReportRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    ) {}

    @Transactional()
    public async get(dto: GetCasinoDailyReportTipsDto,req: Request,ip: string) {
        try {
            const response = await this.repo.getReport(dto,'/api/gamehistory/v1/casino/tips/stream');

            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.REPORT,
                    "[Casino tips stream fetched successfully.]",
                    ip,
                    req.headers["user-agent"],
                ));

            return response;
        } catch (e) {
            throw new FetchReportFailedException(e);
        }
    }
}