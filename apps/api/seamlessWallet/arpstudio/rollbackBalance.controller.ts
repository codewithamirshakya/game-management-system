import { Controller, Get, Ip, Query, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { RollbackBalanceService } from "@src/modules/core/seamlessWallet/service/arpstudio/rollback.service";
import { RollbackBalanceDto } from "@src/modules/core/seamlessWallet/dtos/arpstudio/rollbackbalance.dtos";

@ApiTags('Seamless Wallet')
@Controller("/rollback/balance")
export class RollbackBalanceController extends AbstractController {
    constructor(
        private rollbackBalanceService: RollbackBalanceService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: RollbackBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
        const response = await this.rollbackBalanceService.rollbackBalance(dto);
        this.successResponse(res, "Data Fetched Successfully.", response);
    }

}