import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { WithdrawService } from "../../../../src/modules/core/balance/application/services/arpStudio/withdraw.service";
import {
  WithdrawBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/arpStudio/withdrawBalance.dto";

@Controller('arp-studio/balance/withdraw')
export class WithdrawController extends AbstractController{
  constructor(
    private service : WithdrawService,
  ) {super();}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Body() dto: WithdrawBalanceDto,@Res() res : Response) {
    const response = await this.service.withdrawBalance(dto);
    this.successResponse(res,'User balance withdrawn successfully.',response)
  }
}