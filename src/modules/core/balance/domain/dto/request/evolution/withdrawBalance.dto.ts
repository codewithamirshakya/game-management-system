import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";
import {EvolutionConfig} from "../../../../../../../config/evolution.config";

export class WithdrawBalanceDto extends DataTransferObject{
  readonly cCode: string = 'EDB';

  readonly amount: number;

  readonly eTransID: string;

  readonly ecID: string = EvolutionConfig.ecId;

  readonly euID: string;

  readonly output: string;

  readonly tcheck: string;

  readonly uID: string;

}