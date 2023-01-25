import { DepositBalanceDto } from "../dto/request/arpStudio/depositBalance.dto";
import { DepositBalanceDto as VelaDepositBalanceDto } from "../dto/request/vela/depositBalance.dto";

export interface IDepositBalanceRepositoryInterface {
  deposit(dto: (DepositBalanceDto | VelaDepositBalanceDto));
}