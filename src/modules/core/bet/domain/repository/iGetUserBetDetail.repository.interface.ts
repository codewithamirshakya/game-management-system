import { GetDetailBetDto } from "../dto/request/arpStudio/getDetail.bet.dto";

export interface IGetUserBetDetailRepositoryInterface {
  getDetail(dto: (GetDetailBetDto));
}