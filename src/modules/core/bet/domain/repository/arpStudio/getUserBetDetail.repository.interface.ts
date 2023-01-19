import { GetDetailBetDto } from "../../dto/request/arpStudio/getDetail.bet.dto";
import { IGetUserBetDetailRepositoryInterface } from "../iGetUserBetDetail.repository.interface";

export interface GetUserBetDetailRepositoryInterface extends IGetUserBetDetailRepositoryInterface{
  getDetail(dto:GetDetailBetDto);
}