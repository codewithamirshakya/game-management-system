import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArpStudioDeductBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/deductbalance.dtos";
import { DeductBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDeduct.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";

@ApiTags('Seamless Wallet')
@Controller("/arpstudio/deduct/balance")
export class DeductBalanceController extends AbstractController {
  constructor(
    private deductBalanceService: DeductBalanceService,
  ) {
    super();
  }

  @Post()
  async get(@Body() dto: ArpStudioDeductBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
    const response = await this.deductBalanceService.deductBalance(dto);
    return res.status(200).json(response);
  }

}