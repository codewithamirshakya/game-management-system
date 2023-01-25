import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class SaveTransactionDto extends DataTransferObject {

  readonly trans_id: string;

  readonly main_transaction_id: number;

  readonly available_balance: number;

  readonly vg_transaction_id: string;

  readonly vg_transaction_time: string;

  readonly created_at?: number;
}