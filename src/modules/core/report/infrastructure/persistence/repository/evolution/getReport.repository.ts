import { Inject } from "@nestjs/common";
import { GetReportRepositoryInterface } from "../../../../domain/repository/evolution/getReport.repository.interface";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import {EvolutionRequestDto} from "../../../../../shared/application/dto/evolution.request.dto";

export class GetReportRepository implements GetReportRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getReport(dto: any, endpoint: string): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto,
        endpoint
      })
    }));
  }

}