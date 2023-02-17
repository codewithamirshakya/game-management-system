import {GetCasinoStateDto} from "../../dto/request/evolution/getCasinoState.dto";

export interface GetCasinoStateRepositoryInterface {
  getState(dto: GetCasinoStateDto, casinoId: string);
}