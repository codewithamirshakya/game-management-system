import { Inject } from "@nestjs/common";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/shared/application/dto/evolution.request.dto";
import { SHARED_TYPES } from "@src/modules/shared/application/constants/types";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { EventDispatcherInterface } from "@src/modules/shared/application/EventBus/eventDispatcher.interface";
import { DetailDto } from "../../dtos/evolution/detail.dto";
import { EventDefinition } from "@src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "@src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "@src/modules/core/shared/domain/constants/activityType.constant";
import { UserFetchFailedException } from "../../exception/userFetchFailed.exception";
import { DetailEvolution } from "../../interface/evolutionDetail.interface";
import { EvolutionConfig } from "@src/config/evolution.config";

export class GetUserDetailEvolutionService {
    constructor(
    //   @Inject(TYPES.evolutionRepository.GetUserDetailRepositoryInterface) private repo: GetUserDetailRepositoryInterface,
      @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
      @Inject(ApiRequestService)
      public apiRequestService: ApiRequestService
      ) {}

    @Transactional()
    async getDetail(dto: DetailDto,req: Request,ip: string) {
        try {
            const detailData: DetailEvolution = {
                ...dto,
                cCode: 'GUI',
                ecID: EvolutionConfig.ecId,
            };
            const response = await this.getDetailEvolution(detailData);
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

    async getDetailEvolution(dto: any){
      return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.EVOLUTION,
        requestDTO: new EvolutionRequestDto({
          method: 'GET',
          params: dto,
          endpoint: '/api/ecashier'
        })
      }));
    }
}