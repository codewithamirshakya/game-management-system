import { DataTransferObject } from '../../../../../../../lib/dto/dataTransferObject';
import {EvolutionConfig} from "../../../../../../../config/evolution.config";

export class GetBalanceDto extends DataTransferObject {
  
  readonly cCode: string = 'RWA';

  readonly ecID: string = EvolutionConfig.ecId;

  readonly euID: string;

  readonly output: string;

  readonly uID: string;

}