import { GetDetailAccountDto } from "../dto/request/arpStudio/getDetail.account.dto";

export interface IGetUserAccountDetailRepositoryInterface {
  getDetail(dto: (GetDetailAccountDto));
}