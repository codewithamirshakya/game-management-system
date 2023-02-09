import { GetBalanceDto as ARPGetBalanceDTO } from "../dto/request/arpStudio/getBalance.dto";
import { GetBalanceDto as VelaGetBalanceDTO } from "../dto/request/vela/getBalance.dto";
import { GetBalanceDto as EvolutionGetBalanceDTO } from "../dto/request/evolution/getBalance.dto";

export interface IGetBalanceRepositoryInterface {
  getBalance(dto: (ARPGetBalanceDTO | VelaGetBalanceDTO | EvolutionGetBalanceDTO));
}