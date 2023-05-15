import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  GetUserTradeDetailService
} from "../../../../src/modules/core/trade/application/services/arpStudio/getUserTrade.detail.service";
import { DetailTradeDto } from "../../../../src/modules/core/trade/application/dtos/request/arpStudio/detail.trade.dto";

@Controller('arp-studio/trade/detail')
export class DetailController extends AbstractController{
  constructor(
    private detailTradeService : GetUserTradeDetailService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DetailTradeDto,@Res() res : Response) {
    const response = await this.detailTradeService.getDetail(dto);
    this.successResponse(res,'User trade detail fetched successfully.',response)
  }
}
