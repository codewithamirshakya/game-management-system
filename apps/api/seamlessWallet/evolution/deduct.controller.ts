import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArpStudioDeductBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/deductbalance.dtos";
import { DeductBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/merchantDeduct.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { DepositEvoutionWalletDto } from "@src/modules/core/seamlessWallet/dtos/evoution/depositBalance.dtos";
import { EvoutionDeductBalanceService } from "@src/modules/core/seamlessWallet/service/evolution/deductBalance.service";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";

@ApiTags('Seamless Wallet')
@Controller("/evolution/deduct/balance")
export class DeductEvolutionBalanceController extends AbstractController {
    constructor(
        private deductBalanceService: EvoutionDeductBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken, @Body() dto: DepositEvoutionWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const resquestData = { queryDto, dto }
        const response = await this.deductBalanceService.deductBalance(resquestData);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}