import {
  Controller,
  Get, Ip, Query, Req, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { LaunchLobbyService } from "../../../../src/modules/core/game/application/services/vela/launchLobby.service";
import { LaunchLobbyDto } from "../../../../src/modules/core/game/application/dtos/request/vela/launchLobby.dto";

@Controller('vela/lobby/launch')
export class LaunchController extends AbstractController{
  constructor(
    private service : LaunchLobbyService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Req() req,@Res() res : Response,@Query() dto: LaunchLobbyDto,@Ip() ip) {
    const responseUrl = await this.service.launch(dto,ip,req);
    res.redirect(responseUrl);
  }
}
