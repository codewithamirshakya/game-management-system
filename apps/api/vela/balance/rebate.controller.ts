import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { RebateBalanceDto } from "../../../../src/modules/core/balance/application/dtos/request/vela/rebateBalance.dto";
import {
  RebateBalanceService
} from "../../../../src/modules/core/balance/application/services/vela/rebateBalance.service";

@Controller('vela/balance/rebate')
export class RebateController extends AbstractController{
  constructor(
    private service : RebateBalanceService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: RebateBalanceDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.rebateBalance(dto,req,ip);
    this.successResponse(res,'Rebate claim request operated successfully.',response)
  }
}