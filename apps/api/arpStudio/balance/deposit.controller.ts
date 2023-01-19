import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { DepositService } from "../../../../src/modules/core/balance/application/services/arpStudio/deposit.service";
import {
  DepositBalanceDto
} from "../../../../src/modules/core/balance/application/dtos/request/arpStudio/depositBalance.dto";

@Controller('arp-studio/balance/deposit')
export class DepositController extends AbstractController{
  constructor(
    private service : DepositService,
  ) {super();}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Body() dto: DepositBalanceDto,@Res() res : Response) {
    const response = await this.service.depositBalance(dto);
    this.successResponse(res,'User balance deposited successfully.',response)
  }
}