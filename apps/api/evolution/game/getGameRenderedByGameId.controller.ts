import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  GetRenderedResultByGameIdService
} from "../../../../src/modules/core/game/application/services/evolution/getRenderedResultByGameId.service";
import {
  GetRenderedResultByGameIdDto
} from "../../../../src/modules/core/game/application/dtos/request/evolution/getRenderedResultByGameId.dto";

@ApiTags('Evolution')
@Controller('evolution/games/get-rendered-by-game-id')
export class GetGameRenderedByGameIdController extends AbstractController{
  constructor(
    private service : GetRenderedResultByGameIdService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: GetRenderedResultByGameIdDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getRenderedResult(dto,req,ip);
    this.successResponse(res,'Games rendered in html format fetched successfully.',response)
  }
}