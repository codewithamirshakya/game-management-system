import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { EvoutionCancelBalanceService } from "@src/modules/core/seamlessWallet/service/evolution/cancelBalance.service";
import { DepositEvoutionWalletDto } from "@src/modules/core/seamlessWallet/dtos/evoution/depositBalance.dtos";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";

@ApiTags('Seamless Wallet')
@Controller("/evoultion/cancel/balance")
export class CancelEvoutionBalanceController extends AbstractController {
    constructor(
        private cancelBalanceService: EvoutionCancelBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken, @Body() dto: DepositEvoutionWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const resquestData = { queryDto, dto }
        const response = await this.cancelBalanceService.cancelBalance(resquestData);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}