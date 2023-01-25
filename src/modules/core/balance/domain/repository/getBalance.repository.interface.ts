import { GetBalanceDto as ARPGetBalanceDTO } from "../dto/request/arpStudio/getBalance.dto";
import { GetBalanceDto as VelaGetBalanceDTO } from "../dto/request/vela/getBalance.dto";

export interface IGetBalanceRepositoryInterface {
  getBalance(dto: (ARPGetBalanceDTO | VelaGetBalanceDTO));
}