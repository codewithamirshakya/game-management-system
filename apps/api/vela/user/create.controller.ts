import {
  Controller,
  Get, Ip, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { CreatePlayerService } from "../../../../src/modules/core/user/application/services/vela/createPlayer.service";
import { CreatePlayerDto } from "../../../../src/modules/core/user/application/dtos/request/vela/createPlayer.dto";

@Controller('vela/user/create')
export class CreateController extends AbstractController{
  constructor(
    private service : CreatePlayerService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Res() res : Response,@Query() query: CreatePlayerDto,@Ip() ip) {
    const response = await this.service.create(query,ip);
    this.successResponse(res,'User created successfully.',response)
  }
}
