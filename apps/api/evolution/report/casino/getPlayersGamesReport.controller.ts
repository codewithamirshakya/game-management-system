import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {AbstractController} from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
    GetPlayersGameReportService
} from "../../../../../src/modules/core/report/application/services/evolution/getPlayersGameReport.service";
import {
    GetPlayersGameReportDto
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getPlayersGameReport.dto";

@ApiTags('Evolution')
@Controller('evolution/report/casino/get-players-game-report')
export class GetPlayersGamesReportController extends AbstractController{
    constructor(
        private service : GetPlayersGameReportService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetPlayersGameReportDto,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.get(dto,req,ip);
        this.successResponse(res,'Players games report fetched successfully.',response)
    }
}