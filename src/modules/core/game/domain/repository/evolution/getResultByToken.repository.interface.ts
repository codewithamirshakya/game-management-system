import {GetRenderedResultDto} from "../../dto/request/evolution/getRenderedResult.dto";

export interface GetResultByTokenRepositoryInterface {
  getResult(dto: GetRenderedResultDto);
}