import { WithdrawBalanceDto } from "../dto/request/arpStudio/withdrawBalance.dto";
import { WithdrawBalanceDto as VelaWithdrawBalanceDto } from "../dto/request/vela/withdrawBalance.dto";

export interface IWithdrawBalanceRepositoryInterface {
  withdraw(dto: (WithdrawBalanceDto | VelaWithdrawBalanceDto));
}