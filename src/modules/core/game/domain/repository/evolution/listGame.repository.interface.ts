import { EvolutionFormatEnum } from "../../../application/dtos/request/main/listGame.dto";

export interface ListGameRepositoryInterface {
  getGameListWithClassification(format: EvolutionFormatEnum);
  getGameListWithBets(format: EvolutionFormatEnum);
}