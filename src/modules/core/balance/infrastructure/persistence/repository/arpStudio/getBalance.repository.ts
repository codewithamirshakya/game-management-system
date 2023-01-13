import { GetBalanceRepositoryInterface } from "../../../../domain/repository/arpStudio/getBalance.repository.interface";
import { GetBalanceDto } from "../../../../domain/dto/request/arpStudio/getBalance.dto";
import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";

export class GetBalanceRepository implements GetBalanceRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  getBalance(dto: GetBalanceDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/user/balance'
    }));
  }
}