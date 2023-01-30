import { GetRebateWalletDto } from "../../dto/request/vela/getRebateWallet.dto";

export interface GetRebateWalletBalanceRepositoryInterface{
  get(dto:GetRebateWalletDto);
}