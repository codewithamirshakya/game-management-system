import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { ListGameService } from "../../../../src/modules/core/game/application/services/vela/listGame.service";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";

@Controller('vela/game/list')
export class ListController extends AbstractController{
  constructor(
    private service : ListGameService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Res() res : Response,@Query() hostId?: string) {
    const response = await this.service.getList(hostId);
    this.successResponse(res,'Game list fetched successfully.',response)
  }
}
