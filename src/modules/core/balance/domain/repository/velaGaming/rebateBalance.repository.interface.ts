import { IRebateBalanceRepositoryInterface } from "../iRebateBalance.repository.interface";
import { RebateBalanceDto } from "../../dto/request/vela/rebateBalance.dto";

export interface RebateBalanceRepositoryInterface extends IRebateBalanceRepositoryInterface{
  rebate(dto:RebateBalanceDto);
}