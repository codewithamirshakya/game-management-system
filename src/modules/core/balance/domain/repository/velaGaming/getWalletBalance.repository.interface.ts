import { GetBalanceDto } from "../../dto/request/vela/getBalance.dto";
import { IGetBalanceRepositoryInterface } from "../getBalance.repository.interface";

export interface GetWalletBalanceRepositoryInterface extends IGetBalanceRepositoryInterface{
  getBalance(dto:GetBalanceDto);
}