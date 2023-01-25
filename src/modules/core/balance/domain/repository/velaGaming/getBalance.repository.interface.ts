import { GetBalanceDto } from "../../dto/request/vela/getBalance.dto";
import { IGetBalanceRepositoryInterface } from "../getBalance.repository.interface";

export interface GetBalanceRepositoryInterface extends IGetBalanceRepositoryInterface{
  getBalance(dto:GetBalanceDto);
}