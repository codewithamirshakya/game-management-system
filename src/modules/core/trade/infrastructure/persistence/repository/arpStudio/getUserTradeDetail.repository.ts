import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import {
  GetUserTradeDetailRepositoryInterface
} from "../../../../domain/repository/arpStudio/getUserTradeDetail.repository.interface";
import { GetDetailTradeDto } from "../../../../domain/dto/request/arpStudio/getDetail.trade.dto";

export class GetUserTradeDetailRepository implements GetUserTradeDetailRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  getDetail(dto: GetDetailTradeDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/user/trade'
    }));
  }
}