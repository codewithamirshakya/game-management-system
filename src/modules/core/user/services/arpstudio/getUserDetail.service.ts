import { Inject } from "@nestjs/common";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { EventDefinition } from "src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "src/modules/core/shared/domain/constants/activityType.constant";
import { Request } from "express";
import { DetailUserDto } from "../../dtos/arpStudio/detail.user.dto";
import { ArpStudioRequestService } from "src/modules/core/shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";
import { SHARED_TYPES } from "src/modules/shared/application/constants/types";
import { EventDispatcherInterface } from "src/modules/shared/application/EventBus/eventDispatcher.interface";
import { UserFetchFailedException } from "../../domain/exception/userFetchFailed.exception";
export class GetUserDetailArpStudioService {
    constructor(
      @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
      @Inject(ArpStudioRequestService)
      public arpStudioRequestService: ArpStudioRequestService
      ) {}

    async getDetail(dto: DetailUserDto,req: Request,ip: string) {
        try {
            const response = await this.getUserDetail(dto);

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

    async getUserDetail(data: DetailUserDto): Promise<any> {
      return this.arpStudioRequestService.request(new ArpStudioRequestDto({
        method: 'GET',
        params: data,
        endpoint: '/user/info'
      }));
    }
}