import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  GetRebateWalletBalanceService
} from "../../../../src/modules/core/balance/application/services/vela/getRebateWalletBalance.service";
import {
  GetRebateWalletBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/vela/getRebateWalletBalance.dto";

@Controller('vela/balance/get-rebate-wallet-balance')
export class GetRebateWalletBalanceController extends AbstractController{
  constructor(
    private service : GetRebateWalletBalanceService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetRebateWalletBalanceDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.get(dto,req,ip);
    this.successResponse(res,'Player rebate wallet balance fetched successfully.',response)
  }
}