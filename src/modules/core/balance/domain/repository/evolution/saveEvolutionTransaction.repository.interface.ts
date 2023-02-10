import { SaveTransactionDto } from "../../dto/request/evolution/saveTransaction.dto";

export interface SaveEvolutionTransactionRepositoryInterface {
  save(dto: (SaveTransactionDto));
}