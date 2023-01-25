import { SaveTransactionDto } from "../../dto/request/vela/saveTransaction.dto";

export interface SaveVelaTransactionRepositoryInterface {
  save(dto: (SaveTransactionDto));
}