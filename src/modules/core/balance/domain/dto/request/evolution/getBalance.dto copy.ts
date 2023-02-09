import { DataTransferObject } from './../../../../../../../lib/dto/dataTransferObject';

export class GetBalanceDto extends DataTransferObject {
  
  readonly cCode: string;
  
  readonly ecID: string;

  readonly euID: string;

  readonly output: string;

  readonly uID: string;

}