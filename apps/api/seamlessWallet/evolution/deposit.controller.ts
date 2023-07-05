import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DepositMerchantBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/depositbalanc.dtos";
import { DepositBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDepositBalance.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { DepositEvoutionWalletDto } from "@src/modules/core/seamlessWallet/dtos/evoution/depositBalance.dtos";
import { EvoutionDepositBalanceService } from "@src/modules/core/seamlessWallet/service/evolution/depositBalance.service";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";

@ApiTags('Seamless Wallet')
@Controller("/evolution/deposit/balance")
export class DepositEvolutionBalanceController extends AbstractController {
    constructor(
        private depositBalanceService: EvoutionDepositBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken, @Body() dto: DepositEvoutionWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const resquestData = { queryDto, dto }
        const response = await this.depositBalanceService.depositBalance(resquestData);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}