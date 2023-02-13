import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";
import {EvolutionConfig} from "../../../../../../../config/evolution.config";

export class DepositBalanceDto extends DataTransferObject{
  readonly cCode: string = 'ECR';

  readonly amount: number;

  readonly currency: string;

  readonly eTransID: string;

  readonly ecID: string = EvolutionConfig.ecId;

  readonly euID: string;

  readonly output: string;

  readonly tcheck: string;

  readonly uID: string;

}