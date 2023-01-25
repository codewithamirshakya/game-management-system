import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  DepositBalanceService
} from "../../../../src/modules/core/balance/application/services/vela/depositBalance.service";
import {
  DepositBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/vela/depositBalance.dto";

@Controller('vela/balance/deposit')
export class DepositController extends AbstractController{
  constructor(
    private service : DepositBalanceService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DepositBalanceDto,@Res() res : Response) {
    const response = await this.service.depositBalance(dto);
    this.successResponse(res,'Funds deposited successfully.',response)
  }
}