import { DepositBalanceDto } from "../../dto/request/vela/DepositBalance.dto";
import { IDepositBalanceRepositoryInterface } from "../iDepositBalance.repository.interface";

export interface DepositBalanceRepositoryInterface extends IDepositBalanceRepositoryInterface{
  deposit(dto:DepositBalanceDto);
}