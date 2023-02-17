import {GetRenderedResultByGameIDDto} from "../../dto/request/evolution/getRenderedResultByGameID.dto";

export interface GetResultByGameIdRepositoryInterface {
  getResult(dto: GetRenderedResultByGameIDDto);
}