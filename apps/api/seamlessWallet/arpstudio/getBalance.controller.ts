import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetBalanceWalletDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/getbalance.dtos";
import { ArpStudioWallletBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/getBalance.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";


@ApiTags('Seamless Wallet')
@Controller("/arpstudio/wallet/balance")
export class GetBalanceWalletController extends AbstractController {
    constructor(
        private arpStudioWalletBalanceService: ArpStudioWallletBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Body() dto: GetBalanceWalletDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const response = await this.arpStudioWalletBalanceService.getBalance(dto);
        return res.status(200).json(response);
    }

}