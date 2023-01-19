import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  ListGameLobbyService
} from "../../../../../src/modules/core/game/application/services/arpStudio/listGameLobby.service";
import {
  ListGameLobbyDto
} from "../../../../../src/modules/core/game/application/dtos/request/arpStudio/listGameLobby.dto";

@Controller('arp-studio/game/lobby/list')
export class ListController extends AbstractController{
  constructor(
    private service : ListGameLobbyService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: ListGameLobbyDto,@Res() res : Response) {
    const response = await this.service.getList(dto);
    this.successResponse(res,'Game lobby list fetched successfully.',response)
  }
}
