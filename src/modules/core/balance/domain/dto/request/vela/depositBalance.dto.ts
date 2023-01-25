import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class DepositBalanceDto extends DataTransferObject{
  readonly host_id: string;

  readonly member_id: string;

  readonly amount: number;

  readonly transid: string;

}