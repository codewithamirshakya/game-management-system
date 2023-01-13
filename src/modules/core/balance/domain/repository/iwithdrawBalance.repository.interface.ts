import { WithdrawBalanceDto } from "../dto/request/arpStudio/withdrawBalance.dto";

export interface IWithdrawBalanceRepositoryInterface {
  withdraw(dto: (WithdrawBalanceDto));
}