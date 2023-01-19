import { IGetUserTradeDetailRepositoryInterface } from "../iGetUserTradeDetail.repository.interface";
import { GetDetailTradeDto } from "../../dto/request/arpStudio/getDetail.trade.dto";

export interface GetUserTradeDetailRepositoryInterface extends IGetUserTradeDetailRepositoryInterface{
  getDetail(dto:GetDetailTradeDto);
}