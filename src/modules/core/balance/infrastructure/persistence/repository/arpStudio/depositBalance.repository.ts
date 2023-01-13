import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import { WithdrawBalanceDto } from "../../../../domain/dto/request/arpStudio/withdrawBalance.dto";
import {
  DepositBalanceRepositoryInterface
} from "../../../../domain/repository/arpStudio/depositBalance.repository.interface";

export class DepositBalanceRepository implements DepositBalanceRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  async deposit(dto: WithdrawBalanceDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: dto,
      endpoint: '/user/dw'
    }));
  }
}