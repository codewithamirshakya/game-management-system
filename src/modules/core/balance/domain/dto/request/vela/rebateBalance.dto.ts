import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class RebateBalanceDto extends DataTransferObject{
  readonly host_id: string;

  readonly member_id: string;

  readonly amount: number;
}