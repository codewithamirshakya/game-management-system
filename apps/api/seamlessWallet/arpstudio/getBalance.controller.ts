import { Controller, Get, Ip, Query, Req, Res} from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { ArpStudioWallletBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/getBalance.service";
import { GetBalanceWalletDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/getbalance.dtos";

@ApiTags('Sealmess Wallet')
@Controller("arpstudio/get/balance")
export class GetBalanceWalletController extends AbstractController {
  constructor(
    private arpStudioWallletBalanceService: ArpStudioWallletBalanceService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: GetBalanceWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
    const response = await this.arpStudioWallletBalanceService.getBalance(dto);
    this.successResponse(res, "Data Fetched Successfully.", response);
  }

}