import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  DepositBalanceService
} from "../../../../src/modules/core/balance/application/services/evolution/depositBalance.service";
import {
  DepositBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/evolution/depositBalance.dto";

@ApiTags('Evolution')
@Controller('evolution/balance/deposit')
export class DepositController extends AbstractController{
  constructor(
    private service : DepositBalanceService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DepositBalanceDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.depositBalance(dto,req,ip);
    this.successResponse(res,'Funds transfer to evolution wallet successfull.',response)
  }
}