import { GetDetailTradeDto } from "../dto/request/arpStudio/getDetail.trade.dto";

export interface IGetUserTradeDetailRepositoryInterface {
  getDetail(dto: (GetDetailTradeDto));
}