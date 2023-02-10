import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  WithdrawBalanceService
} from "../../../../src/modules/core/balance/application/services/evolution/withdrawBalance.service";
import {
  WithdrawBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/evolution/withdrawBalance.dto";

@ApiTags('Evolution')
@Controller('evolution/balance/withdraw')
export class WithdrawController extends AbstractController{
  constructor(
    private service : WithdrawBalanceService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: WithdrawBalanceDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.withdrawBalance(dto,req,ip);
    this.successResponse(res,'Funds withdrawn from evolution wallet successfull.',response)
  }
}