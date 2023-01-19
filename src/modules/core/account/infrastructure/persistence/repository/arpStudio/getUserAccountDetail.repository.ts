import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import {
  GetUserAccountDetailRepositoryInterface
} from "../../../../domain/repository/arpStudio/getUserAccountDetail.repository.interface";
import { GetDetailAccountDto } from "../../../../domain/dto/request/arpStudio/getDetail.account.dto";

export class GetUserAccountDetailRepository implements GetUserAccountDetailRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  getDetail(dto: GetDetailAccountDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/record/account/detail'
    }));
  }
}