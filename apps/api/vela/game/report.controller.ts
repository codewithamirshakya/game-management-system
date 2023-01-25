import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  GetGameReportService
} from "../../../../src/modules/core/game/application/services/vela/getGameReport.service";
import { GetGameReportDto } from "../../../../src/modules/core/game/application/dtos/request/vela/getGameReport.dto";

@Controller('vela/game/report')
export class ReportController extends AbstractController{
  constructor(
    private service : GetGameReportService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Res() res : Response,@Query() dto: GetGameReportDto) {
    const response = await this.service.getReport(dto);
    this.successResponse(res,'Game reports fetched successfully.',response)
  }
}
