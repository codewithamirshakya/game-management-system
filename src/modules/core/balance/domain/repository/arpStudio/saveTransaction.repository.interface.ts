import { SaveTransactionDto } from "../../dto/request/arpStudio/saveTransaction.dto";

export interface SaveTransactionRepositoryInterface {
  save(dto: (SaveTransactionDto));
}