import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { ListGameLobbyDto } from "../../dtos/request/arpStudio/listGameLobby.dto";
import {
    ListGameLobbyRepositoryInterface
} from "../../../domain/repository/arpStudio/listGameLobby.repository.interface";
import { Request } from "express";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { RetreiveGameListFailedException } from "../../../domain/exception/retreiveGameListFailed.exception";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import {
    AsyncEventDispatcherInterface
} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";

export class ListGameLobbyService {
    constructor(
      @Inject(TYPES.repository.ListGameLobbyRepositoryInterface) private repo: ListGameLobbyRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
    ) {}

    public async getList(dto: ListGameLobbyDto,req: Request,ip: string) {
        try {
            const response = await this.repo.getList(dto);
            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
              new ActivityCompletedEvent(
                GameProviderConstant.ARP_STUDIO,
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
}