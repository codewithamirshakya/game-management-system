import {PickType} from "@nestjs/swagger";
import {GetCasinoDailyReportDTO} from "./getCasinoDailyReport.dto";

export class GetCasinoDailyReportTipsDto extends PickType(GetCasinoDailyReportDTO,['startDate','endDate','channel']){

}
