import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { DetailTradeDto } from "../../dtos/request/arpStudio/detail.trade.dto";
import {
    GetUserTradeDetailRepositoryInterface
} from "../../../domain/repository/arpStudio/getUserTradeDetail.repository.interface";

export class GetUserTradeDetailService {
    constructor(
      @Inject(TYPES.repository.GetUserTradeDetailRepositoryInterface) private repo: GetUserTradeDetailRepositoryInterface,
    ) {}

    public getDetail(dto: DetailTradeDto) {
        return this.repo.getDetail(dto);
    }
}