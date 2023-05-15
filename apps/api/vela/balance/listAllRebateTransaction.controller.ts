import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  ListAllRebateTransactionDto
} from "../../../../src/modules/core/balance/application/dtos/request/vela/listAllRebateTransaction.dto";
import {
  ListAllRebateTransactionService
} from "../../../../src/modules/core/balance/application/services/vela/listAllRebateTransaction.service";

@Controller('vela/balance/list-all-rebate-transaction')
export class ListAllRebateTransactionController extends AbstractController{
  constructor(
    private service : ListAllRebateTransactionService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: ListAllRebateTransactionDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.listAll(dto,req,ip);
    this.successResponse(res,'Rebate transactions fetched successfully.',response)
  }
}