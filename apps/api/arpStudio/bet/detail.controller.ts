import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { UserDTO } from "../../../../src/modules/core/user/application/dtos/response/user.dto";
import { Serialize } from "../../../../src/lib/interceptors/serialize.interceptor";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  GetUserBetDetailService
} from "../../../../src/modules/core/bet/application/services/arpStudio/getUserBet.detail.service";
import { DetailBetDto } from "../../../../src/modules/core/bet/application/dtos/request/arpStudio/detail.bet.dto";

@Controller('arp-studio/bet/detail')
export class DetailController extends AbstractController{
  constructor(
    private detailBetService : GetUserBetDetailService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DetailBetDto,@Res() res : Response) {
    const response = await this.detailBetService.getDetail(dto);
    this.successResponse(res,'User bet records fetched successfully.',response)
  }
}
