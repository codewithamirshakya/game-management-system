import { Controller, Get, Ip, Query, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { ArpStudioDeductBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/deductbalance.dtos";
import { DeductBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDeduct.service";
import { DepositMerchantBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/depositbalanc.dtos";
import { DepositBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDepositBalance.service";

@ApiTags('Seamless Wallet')
@Controller("/deposit/balance")
export class DepositBalanceController extends AbstractController {
    constructor(
        private depositBalanceService: DepositBalanceService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: DepositMerchantBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const response = await this.depositBalanceService.depositBalance(dto);
        this.successResponse(res, "Data Fetched Successfully.", response);
    }

}