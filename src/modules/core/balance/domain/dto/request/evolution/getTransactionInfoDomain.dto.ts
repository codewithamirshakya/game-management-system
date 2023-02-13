import { DataTransferObject } from '../../../../../../../lib/dto/dataTransferObject';
import {EvolutionConfig} from "../../../../../../../config/evolution.config";

export class GetTransactionInfoDomainDto extends DataTransferObject {
  
  readonly cCode: string = 'TRI';

  readonly ecID: string = EvolutionConfig.ecId;

  readonly euID: string;

  readonly output: string;

  readonly uID: string;
  readonly eTransID: string;

}