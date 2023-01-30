import { ListAllRebateTransactionDto } from "../../dto/request/vela/listAllRebateTransaction.dto";

export interface ListAllRebateTransactionRepositoryInterface {
  listAll(dto:ListAllRebateTransactionDto);
}