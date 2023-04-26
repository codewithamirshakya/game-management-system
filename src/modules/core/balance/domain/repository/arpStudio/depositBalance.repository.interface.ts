import { DepositBalanceDto } from "../../dto/request/arpStudio/depositBalance.dto";
import { IDepositBalanceRepositoryInterface } from "../idepositBalance.repository.interface";

export interface DepositBalanceRepositoryInterface extends IDepositBalanceRepositoryInterface{
  deposit(dto:DepositBalanceDto);
}