import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  WithdrawBalanceService
} from "../../../../src/modules/core/balance/application/services/vela/withdrawBalance.service";
import {
  WithdrawBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/vela/withdrawBalance.dto";

@Controller('vela/balance/withdraw')
export class WithdrawController extends AbstractController{
  constructor(
    private service : WithdrawBalanceService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: WithdrawBalanceDto,@Res() res : Response) {
    const response = await this.service.withdrawBalance(dto);
    this.successResponse(res,'Funds withdrawn successfully.',response)
  }
}