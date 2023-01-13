import { GetBalanceDto } from "../dto/request/arpStudio/getBalance.dto";

export interface IGetBalanceRepositoryInterface {
  getBalance(dto: (GetBalanceDto));
}