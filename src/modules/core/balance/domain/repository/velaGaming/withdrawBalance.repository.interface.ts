import { IWithdrawBalanceRepositoryInterface } from "../iwithdrawBalance.repository.interface";
import { WithdrawBalanceDto } from "../../dto/request/vela/withdrawBalance.dto";

export interface WithdrawBalanceRepositoryInterface extends IWithdrawBalanceRepositoryInterface{
  withdraw(dto:WithdrawBalanceDto);
}