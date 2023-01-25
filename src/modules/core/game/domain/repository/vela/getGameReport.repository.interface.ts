import { GetGameReportDto } from "../../dto/request/vela/getGameReport.dto";

export interface GetGameReportRepositoryInterface {
  getReport(dto: GetGameReportDto);
}