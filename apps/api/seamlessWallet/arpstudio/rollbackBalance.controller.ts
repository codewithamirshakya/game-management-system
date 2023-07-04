import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RollbackBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/rollbackbalance.dtos";
import { RollbackBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/rollback.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";

@ApiTags('Seamless Wallet')
@Controller("/arpstudio/rollback/balance")
export class RollbackBalanceController extends AbstractController {
    constructor(
        private rollbackBalanceService: RollbackBalanceService,
    ) {
        super();
    }

    @Post()
    async get(@Body() dto: RollbackBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const response = await this.rollbackBalanceService.rollbackBalance(dto);
        return res.status(200).json(response);
    }

}