import { DetailUserDto } from "../../dtos/request/arpStudio/detail.user.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
    GetUserDetailRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/getUserDetail.repository.interface";

export class GetUserDetailService {
    constructor(
      @Inject(TYPES.repository.GetUserDetailRepositoryInterface) private repo: GetUserDetailRepositoryInterface,
    ) {}

    public getDetail(dto: DetailUserDto) {
        return this.repo.get(dto);
    }
}