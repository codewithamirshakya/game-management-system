import { Controller, Get, Ip, Query, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { ArpStudioDeductBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/deductbalance.dtos";
import { DeductBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDeduct.service";

@ApiTags('Seamless Wallet')
@Controller("/deduct/balance")
export class DeductBalanceController extends AbstractController {
  constructor(
    private deductBalanceService: DeductBalanceService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: ArpStudioDeductBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
    const response = await this.deductBalanceService.deductBalance(dto);
    this.successResponse(res, "Data Fetched Successfully.", response);
  }

}