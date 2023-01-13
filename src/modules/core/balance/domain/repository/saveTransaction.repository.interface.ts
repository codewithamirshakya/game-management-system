import { SaveTransactionDto } from "../dto/request/saveTransaction.dto";

export interface SaveTransactionRepositoryInterface {
  save(dto: (SaveTransactionDto));
}