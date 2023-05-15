import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { GetBalanceDto } from "../../../../src/modules/core/balance/application/dtos/request/vela/getBalance.dto";
import {
  GetWalletBalanceService
} from "../../../../src/modules/core/balance/application/services/vela/getWalletBalance.service";

@Controller('vela/balance/wallet')
export class WalletController extends AbstractController{
  constructor(
    private getBalanceService : GetWalletBalanceService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetBalanceDto,@Res() res : Response) {
    const response = await this.getBalanceService.getBalance(dto);
    this.successResponse(res,'User balance info fetched successfully.',response)
  }
}