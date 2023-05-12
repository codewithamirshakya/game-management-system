import { EvolutionConfig } from "@src/config/evolution.config";
import { DataTransferObject } from "@src/lib/dto/dataTransferObject";

export class GetBalanceDto extends DataTransferObject {
  
//   readonly cCode: string = 'RWA';

//   readonly ecID: string = EvolutionConfig.ecId;

  readonly euID: string;

  readonly output: string;

  readonly uID: string;

}