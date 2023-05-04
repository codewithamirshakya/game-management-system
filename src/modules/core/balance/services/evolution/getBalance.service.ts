
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { EventDefinition } from "src/modules/core/shared/application/constants/eventDefinition";

import { Request } from 'express';
import { ApiRequestService } from 'src/modules/core/shared/application/service/apiRequest.service';
import { ApiRequestDto } from 'src/modules/core/shared/application/dto/apiRequest.dto';
import { EvolutionRequestDto } from 'src/modules/core/shared/application/dto/evolution.request.dto';
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";
import { GetBalanceDto as DomainGetBalanceDto, GetBalanceDto } from "../../interface/getBalanceEvolution.interface";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";

export class GetEvolutionBalanceService {
  constructor(
    // @Inject(TYPES.evolutionRepository.FundRepositoryInterface) private repo: FundRepositoryInterface,
    // @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,

    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) {}


  @Transactional()
  async getBalance(dto: GetBalanceDto,req: Request,ip: string) { 
    try {
      const response = await this.getEvolutionBalance(new DomainGetBalanceDto(dto));
      //activity completed event dispatch
      // this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
      //   new ActivityCompletedEvent(
      //     GameProviderConstant.EVOLUTION,
      //     ActivityTypeConstant.FUNDS_TRANSFER,
      //     "[Player balance fetched successfully.]",
      //     ip,
      //     req.headers["user-agent"],
      //   ));

      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getEvolutionBalance(dto: any){
    console.log('fund dto', dto);
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