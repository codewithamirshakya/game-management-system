import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import {
  WithdrawBalanceRepositoryInterface
} from "../../../../domain/repository/arpStudio/withdrawBalance.repository.interface";
import { WithdrawBalanceDto } from "../../../../domain/dto/request/arpStudio/withdrawBalance.dto";

export class WithdrawBalanceRepository implements WithdrawBalanceRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  withdraw(dto: WithdrawBalanceDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: dto,
      endpoint: '/user/dw'
    }));
  }
}