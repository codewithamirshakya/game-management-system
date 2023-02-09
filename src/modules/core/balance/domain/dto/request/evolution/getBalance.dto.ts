import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class GetBalanceDto extends DataTransferObject{
  readonly host_id?: string;

  readonly member_id: string;
}