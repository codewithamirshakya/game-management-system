import { Inject } from "@nestjs/common";
import {Request} from "express";
import {Transactional} from "typeorm-transactional";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/shared/application/dto/evolution.request.dto";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { DetailDto } from "../../dtos/evolution/detail.dto";
import { UserFetchFailedException } from "../../exception/userFetchFailed.exception";
import { DetailEvolution } from "../../interface/evolutionDetail.interface";
import { EvolutionConfig } from "@src/config/evolution.config";

export class GetUserDetailEvolutionService {
    constructor(
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