import { EvolutionConfig } from "src/config/evolution.config";
import { DataTransferObject } from "src/lib/dto/dataTransferObject";


export interface DetailEvolution {
  readonly cCode: string ;
  readonly ecID: string ;

  readonly euID: string;

  readonly output: string;

  readonly uID?: string;

}