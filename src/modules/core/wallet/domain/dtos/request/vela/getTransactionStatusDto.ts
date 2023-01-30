import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class GetTransactionStatusDto extends DataTransferObject{
  readonly host_id?: string;
  readonly trans_id: string;
}