import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class SaveTransactionDto extends DataTransferObject {

  readonly source: string;

  readonly main_transaction_id: number;

  readonly account_type: number;

  readonly trade_no?: number;

  readonly created_at?: number;

  readonly updated_at?: number;
}