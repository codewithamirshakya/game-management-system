import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetGameReportRepositoryInterface } from "../../../domain/repository/vela/getGameReport.repository.interface";
import { GetGameReportDto } from "../../dtos/request/vela/getGameReport.dto";

export class GetGameReportService {
    constructor(
      @Inject(TYPES.velaRepository.GetGameReportRepositoryInterface) private repo: GetGameReportRepositoryInterface,
    ) {}

    public getReport(dto: GetGameReportDto) {
        return this.repo.getReport(dto);
    }
}