import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import {
  GetUserBetDetailRepositoryInterface
} from "../../../../domain/repository/arpStudio/getUserBetDetail.repository.interface";
import { GetDetailBetDto } from "../../../../domain/dto/request/arpStudio/getDetail.bet.dto";

export class GetUserBetDetailRepository implements GetUserBetDetailRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  getDetail(dto: GetDetailBetDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/record/bets/detail'
    }));
  }
}