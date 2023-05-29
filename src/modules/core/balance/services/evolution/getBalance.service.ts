
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { Request } from 'express';
import { ApiRequestService } from '@src/modules/core/common/service/apiRequest.service';
import { ApiRequestDto } from '@src/modules/core/common/dto/apiRequest.dto';
import { EvolutionRequestDto } from '@src/modules/core/shared/application/dto/evolution.request.dto';
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { EvolutionConfig } from "@src/config/evolution.config";
import { EvolutionGetBalanceDto } from "../../interface/getBalanceEvolution.interface";

export class GetEvolutionBalanceService {
  constructor(
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) {}


  @Transactional()
  async getBalance(dto: EvolutionGetBalanceDto,req: Request,ip: string) { 
    try {
      const getBalanceDto = {
        cCode:  'RWA',
        ecID:EvolutionConfig.ecId,
        ...dto
    };
      const response = await this.getEvolutionBalance(getBalanceDto);
      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getEvolutionBalance(dto: any){
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