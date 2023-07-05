import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { GetBalanceEvoutionWalletDto } from "@src/modules/core/seamlessWallet/dtos/evoution/getBalance.dtos";
import { EvoutionWalletBalanceService } from "@src/modules/core/seamlessWallet/service/evolution/getBalance.service";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";


@ApiTags('Seamless Wallet')
@Controller("/evolution/wallet/balance")
export class EvoutionGetBalanceController extends AbstractController {
    constructor(
        private evoutionWalletBalanceService: EvoutionWalletBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken, @Body() dto: GetBalanceEvoutionWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const resquestData = { queryDto, dto }
        const response = await this.evoutionWalletBalanceService.getBalance(resquestData);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}