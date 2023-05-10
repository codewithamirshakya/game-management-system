import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
    GetCasinoDailyReportService
} from "../../../../../src/modules/core/report/application/services/evolution/getCasinoDailyReport.service";
import {AbstractController} from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
    GetCasinoDailyReportDTO
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getCasinoDailyReport.dto";

// @ApiTags('Evolution')
@Controller('evolution/report/casino/daily-report')
export class DailyReportController extends AbstractController{
    constructor(
        private service : GetCasinoDailyReportService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetCasinoDailyReportDTO,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.get(dto,req,ip);
        this.successResponse(res,'Casino daily report fetched successfully.',response)
    }
}