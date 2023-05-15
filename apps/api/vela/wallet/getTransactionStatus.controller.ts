import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  GetTransactionStatusService
} from "../../../../src/modules/core/wallet/application/services/vela/getTransactionStatus.service";
import {
  GetTransactionStatusDto
} from "../../../../src/modules/core/wallet/application/dtos/request/vela/getTransactionStatus.dto";

@Controller('vela/wallet/transaction-status')
export class GetTransactionStatusController extends AbstractController{
  constructor(
    private service : GetTransactionStatusService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetTransactionStatusDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getTransactionStatus(dto,req,ip);
    this.successResponse(res,'Wallet Transaction status fetched successfully.',response)
  }
}