import { GetTransactionStatusDto } from "../../dtos/request/vela/getTransactionStatusDto";

export interface GetTransactionStatusRepositoryInterface {
  getTransactionStatus(dto: GetTransactionStatusDto);
}