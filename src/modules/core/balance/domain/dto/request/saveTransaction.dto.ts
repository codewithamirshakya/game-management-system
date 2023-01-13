import { TransactionEnum } from "../../constants/transactionType.constant";
import { DataTransferObject } from "../../../../../../lib/dto/dataTransferObject";

export class SaveTransactionDto extends DataTransferObject {

  readonly type: TransactionEnum;

  readonly status: number;

  readonly amount: number;

  readonly user_id: number;

  readonly currency_code: string;

  readonly game_provider: number;

  readonly transaction_date?: number;

  readonly updated_at?: number;
}