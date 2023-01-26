import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { LaunchGameService } from "../../../../src/modules/core/game/application/services/vela/launchGame.service";
import { LaunchGameDto } from "../../../../src/modules/core/game/application/dtos/request/vela/launchGame.dto";

@Controller('vela/game/launch')
export class LaunchController extends AbstractController{
  constructor(
    private service : LaunchGameService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Res() res : Response,@Query() dto: LaunchGameDto) {
    const responseUrl = await this.service.launch(dto);
    res.redirect(responseUrl);
  }
}
