import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { DetailAccountDto } from "../../dtos/request/arpStudio/detail.account.dto";
import {
    GetUserAccountDetailRepositoryInterface
} from "../../../domain/repository/arpStudio/getUserAccountDetail.repository.interface";

export class GetUserAccountDetailService {
    constructor(
      @Inject(TYPES.repository.GetUserAccountDetailRepositoryInterface) private repo: GetUserAccountDetailRepositoryInterface,
    ) {}

    public getDetail(dto: DetailAccountDto) {
        return this.repo.getDetail(dto);
    }
}