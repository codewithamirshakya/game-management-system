import { RebateBalanceDto } from "../dto/request/vela/rebateBalance.dto";

export interface IRebateBalanceRepositoryInterface {
  rebate(dto: (RebateBalanceDto));
}