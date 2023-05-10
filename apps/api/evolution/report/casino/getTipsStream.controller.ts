import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {AbstractController} from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
    GetCasinoDailyReportTipsDto
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getCasinoDailyReportTips.dto";
import {
    GetCasinoTipsStreamService
} from "../../../../../src/modules/core/report/application/services/evolution/getCasinoTipsStream..service";

// @ApiTags('Evolution')
@Controller('evolution/report/casino/get-tips-stream')
export class GetTipsStreamController extends AbstractController{
    constructor(
        private service : GetCasinoTipsStreamService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetCasinoDailyReportTipsDto,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.get(dto,req,ip);
        this.successResponse(res,'Casino tips stream fetched successfully.',response)
    }
}