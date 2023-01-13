import { WithdrawBalanceDto } from "../../dto/request/arpStudio/withdrawBalance.dto";
import { IWithdrawBalanceRepositoryInterface } from "../iwithdrawBalance.repository.interface";

export interface WithdrawBalanceRepositoryInterface extends IWithdrawBalanceRepositoryInterface{
  withdraw(dto:WithdrawBalanceDto);
}