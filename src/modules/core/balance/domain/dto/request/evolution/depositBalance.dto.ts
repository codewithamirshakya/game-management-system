import { DataTransferObject } from './../../../../../../../lib/dto/dataTransferObject';
export class DepositBalanceDto extends DataTransferObject{
  readonly cCode: string;

  readonly amount: number;

  readonly currency: string;

  readonly eTransID: string;

  readonly ecID: string;
  
  readonly euID?: string;

  readonly output: string;

  readonly tcheck?: string;

  readonly uID?: string;

}