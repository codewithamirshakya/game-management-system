import { DetailUserDto } from "../../dtos/request/arpStudio/detail.user.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
    GetUserDetailRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/getUserDetail.repository.interface";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { UserFetchFailedException } from "../../../domain/exception/userFetchFailed.exception";
import { Request } from "express";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";

export class GetUserDetailService {
    constructor(
      @Inject(TYPES.repository.GetUserDetailRepositoryInterface) private repo: GetUserDetailRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    ) {}

    public getDetail(dto: DetailUserDto,req: Request,ip: string) {
        try {
            const response = this.repo.get(dto);

            //activity completed event dispatch
            this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
              new ActivityCompletedEvent(
                GameProviderConstant.EVOLUTION,
                ActivityTypeConstant.USER,
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