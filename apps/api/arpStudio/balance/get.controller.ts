import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  GetBalanceService
} from "../../../../src/modules/core/balance/application/services/arpStudio/getBalance.service";
import { GetBalanceDto } from "../../../../src/modules/core/balance/application/dtos/request/arpStudio/getBalance.dto";

@Controller('arp-studio/user/balance')
export class GetController extends AbstractController{
  constructor(
    private getBalanceService : GetBalanceService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetBalanceDto,@Res() res : Response) {
    const response = await this.getBalanceService.getBalance(dto);
    this.successResponse(res,'User balance info fetched successfully.',response)
  }
}