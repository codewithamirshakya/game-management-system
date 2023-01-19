import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { DetailBetDto } from "../../dtos/request/arpStudio/detail.bet.dto";
import {
    GetUserBetDetailRepositoryInterface
} from "../../../domain/repository/arpStudio/getUserBetDetail.repository.interface";

export class GetUserBetDetailService {
    constructor(
      @Inject(TYPES.repository.GetUserBetDetailRepositoryInterface) private repo: GetUserBetDetailRepositoryInterface,
    ) {}

    public getDetail(dto: DetailBetDto) {
        return this.repo.getDetail(dto);
    }
}