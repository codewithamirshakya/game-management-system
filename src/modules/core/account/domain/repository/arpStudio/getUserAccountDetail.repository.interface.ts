import { GetDetailAccountDto } from "../../dto/request/arpStudio/getDetail.account.dto";
import { IGetUserAccountDetailRepositoryInterface } from "../iGetUserAccountDetail.repository.interface";

export interface GetUserAccountDetailRepositoryInterface extends IGetUserAccountDetailRepositoryInterface{
  getDetail(dto:GetDetailAccountDto);
}