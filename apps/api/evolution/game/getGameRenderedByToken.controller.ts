import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  GetRenderedResultService
} from "../../../../src/modules/core/game/application/services/evolution/getRenderedResult.service";
import {
  GetRenderedResultDto
} from "../../../../src/modules/core/game/application/dtos/request/evolution/getRenderedResult.dto";

// @ApiTags('Evolution')
@Controller('evolution/games/get-rendered-by-token')
export class GetGameRenderedByTokenController extends AbstractController{
  constructor(
    private service : GetRenderedResultService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: GetRenderedResultDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getRenderedResult(dto,req,ip);
    this.successResponse(res,'Games rendered in html format fetched successfully.',response)
  }
}