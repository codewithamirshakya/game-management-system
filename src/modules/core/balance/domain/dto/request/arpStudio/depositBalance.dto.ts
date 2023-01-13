import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class DepositBalanceDto extends DataTransferObject{
  readonly appid: string;

  readonly notifyid: string;

  readonly username: string;

  readonly atype: number;

  readonly tradeno?: number;

  readonly amount: number;

  readonly currenttime?: number;

  readonly source: number;
}