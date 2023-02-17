import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {AbstractController} from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
    GetCasinoDailyReportTipsService
} from "../../../../../src/modules/core/report/application/services/evolution/getCasinoDailyReportTips.service";
import {
    GetCasinoDailyReportTipsDto
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getCasinoDailyReportTips.dto";

@ApiTags('Evolution')
@Controller('evolution/report/casino/daily-report-tips')
export class DailyReportTipsController extends AbstractController{
    constructor(
        private service : GetCasinoDailyReportTipsService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetCasinoDailyReportTipsDto,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.get(dto,req,ip);
        this.successResponse(res,'Casino daily report tips fetched successfully.',response)
    }
}