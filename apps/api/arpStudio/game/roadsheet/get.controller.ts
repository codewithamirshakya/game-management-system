import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  GetGameRoadSheetService
} from "../../../../../src/modules/core/game/application/services/arpStudio/getGameRoadSheet.service";
import {
  GetGameRoadSheetDto
} from "../../../../../src/modules/core/game/application/dtos/request/arpStudio/getGameRoadSheet.dto";

@Controller('arp-studio/game/roadsheet/get')
export class GetController extends AbstractController{
  constructor(
    private service : GetGameRoadSheetService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetGameRoadSheetDto,@Res() res : Response) {
    const response = await this.service.get(dto);
    this.successResponse(res,'Game roadsheet fetched successfully.',response)
  }
}
