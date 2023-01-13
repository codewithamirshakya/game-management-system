import { DepositBalanceDto } from "../../dto/request/arpStudio/DepositBalance.dto";
import { IDepositBalanceRepositoryInterface } from "../iDepositBalance.repository.interface";

export interface DepositBalanceRepositoryInterface extends IDepositBalanceRepositoryInterface{
  deposit(dto:DepositBalanceDto);
}