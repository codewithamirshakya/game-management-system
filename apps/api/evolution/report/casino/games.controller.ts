import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {AbstractController} from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
    GetCasinoDailyReportDTO
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getCasinoDailyReport.dto";
import {
    GetCasinoGamesReportService
} from "../../../../../src/modules/core/report/application/services/evolution/getCasinoGamesReport.service";
import {
    GetCasinoGamesDto
} from "../../../../../src/modules/core/report/application/dtos/request/evolution/getCasinoGames.dto";

@ApiTags('Evolution')
@Controller('evolution/report/casino/games')
export class GamesController extends AbstractController{
    constructor(
        private service : GetCasinoGamesReportService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetCasinoGamesDto,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.get(dto,req,ip);
        this.successResponse(res,'Casino games report fetched successfully.',response)
    }
}