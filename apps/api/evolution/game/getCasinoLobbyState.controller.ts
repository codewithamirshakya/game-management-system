import {Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  GetCasinoLobbyStateService
} from "../../../../src/modules/core/game/application/services/evolution/getCasinoLobbyState.service";
import {
  GetCasinoStateDto
} from "../../../../src/modules/core/game/application/dtos/request/evolution/getCasinoState.dto";

@ApiTags('Evolution')
@Controller('evolution/games/get-casino-lobby-state')
export class GetCasinoLobbyStateController extends AbstractController{
  constructor(
    private service : GetCasinoLobbyStateService,
  ) {
    super();
  }
  @Get()
  async get(@Query() dto: GetCasinoStateDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getState(dto,req,ip);
    this.successResponse(res,'Casino lobby state fetched successfully.',response)
  }
}