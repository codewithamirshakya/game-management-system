import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import {
  GetGameReportRepositoryInterface
} from "../../../../domain/repository/vela/getGameReport.repository.interface";
import { GetGameReportDto } from "../../../../domain/dto/request/vela/getGameReport.dto";



export class GetGameReportRepository implements GetGameReportRepositoryInterface{
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  getReport(dto: GetGameReportDto): Promise<any> {
    return this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/report'
      })
    }));
  }
}