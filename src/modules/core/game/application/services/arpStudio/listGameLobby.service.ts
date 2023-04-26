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
import { ArpStudioRequestService } from "src/modules/core/shared/application/service/arpStudio.request.service";
import { ListGameLobbyDomainDto } from "../../../domain/dto/request/arpStudio/listGameLobby.domain.dto";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";

export class ArpStudioListGameLobbyService {
    constructor(
      // @Inject(TYPES.repository.ListGameLobbyRepositoryInterface) private repo: ListGameLobbyRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
      @Inject(ArpStudioRequestService) public arpStudioRequestService: ArpStudioRequestService
    ) {}

     async getArpStudioGameList(dto: ListGameLobbyDto,req: Request,ip: string) {
        try {
            const response = await this.getArpStudioGamesList(dto);
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


    getArpStudioGamesList(dto: ListGameLobbyDomainDto): Promise<any> {
      return this.arpStudioRequestService.request(new ArpStudioRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/client/game/lobby'
      }));
    }
}