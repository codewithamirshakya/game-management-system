import { Controller, Get, Ip, Req, Res } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {ListGameService} from "../../../../src/modules/core/game/application/services/evolution/listGame.service";

@ApiTags('Evolution')
@Controller('evolution/games')
export class ListController extends AbstractController{
  constructor(
    private service : ListGameService,
  ) {
    super();
  }

  @Get('list')
  async get(@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getActiveGamesListWithClassification('object',req,ip);
    this.successResponse(res,'Active Games list fetched successfully.',response)
  }

  @Get('list-plain')
  async getPlainList(@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getActiveGamesListWithClassification('plain',req,ip);
    this.successResponse(res,'Active Games list fetched successfully.',response)
  }
}