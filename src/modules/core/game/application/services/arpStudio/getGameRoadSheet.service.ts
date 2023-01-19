import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetGameRoadSheetDto } from "../../dtos/request/arpStudio/getGameRoadSheet.dto";
import {
    GetGameRoadSheetRepositoryInterface
} from "../../../domain/repository/arpStudio/getGameRoadSheet.repository.interface";

export class GetGameRoadSheetService {
    constructor(
      @Inject(TYPES.repository.GetGameRoadSheetRepositoryInterface) private repo: GetGameRoadSheetRepositoryInterface,
    ) {}

    public get(dto: GetGameRoadSheetDto) {
        return this.repo.get(dto);
    }
}