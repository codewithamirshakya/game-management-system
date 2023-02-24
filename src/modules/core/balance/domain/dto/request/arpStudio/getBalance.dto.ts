import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class GetBalanceDto extends DataTransferObject{
  readonly appid?: string;

  readonly username: string;

  readonly currenttime?: number;

  readonly atype?: number;
}