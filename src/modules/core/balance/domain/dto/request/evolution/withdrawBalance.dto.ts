import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";

export class WithdrawBalanceDto extends DataTransferObject{
  readonly cCode: string = 'EDB';

  readonly amount: number;

  readonly eTransID: string;

  readonly ecID: string;

  readonly euID: string;

  readonly output: string;

  readonly tcheck: string;

  readonly uID: string;

}