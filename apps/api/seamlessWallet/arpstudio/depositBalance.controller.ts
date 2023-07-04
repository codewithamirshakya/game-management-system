import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DepositMerchantBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/depositbalanc.dtos";
import { DepositBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDepositBalance.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";

@ApiTags('Seamless Wallet')
@Controller("/arpstudio/deposit/balance")
export class DepositBalanceController extends AbstractController {
    constructor(
        private depositBalanceService: DepositBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Body() dto: DepositMerchantBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const response = await this.depositBalanceService.depositBalance(dto);
        return res.status(200).json(response);
    }

}