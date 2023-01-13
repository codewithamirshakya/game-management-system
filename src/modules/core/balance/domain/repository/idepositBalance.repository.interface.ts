import { DepositBalanceDto } from "../dto/request/arpStudio/depositBalance.dto";

export interface IDepositBalanceRepositoryInterface {
  deposit(dto: (DepositBalanceDto));
}