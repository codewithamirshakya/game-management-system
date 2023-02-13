import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
    GetTransactionInfoService
} from "../../../../src/modules/core/balance/application/services/evolution/getTransactionInfo.service";
import {
    GetTransactionInfoDto
} from "../../../../src/modules/core/balance/application/dtos/request/evolution/getTransactionInfo.dto";

@ApiTags('Evolution')
@Controller('evolution/balance/transaction-info')
export class TransactionInfoController extends AbstractController{
    constructor(
        private service : GetTransactionInfoService,
    ) {
        super();
    }

    @Get()
    async get(@Query() dto: GetTransactionInfoDto,@Res() res : Response, @Req() req,@Ip() ip) {
        const response = await this.service.getTransactionInfo(dto,req,ip);
        this.successResponse(res,'Transaction information fetched successfully.',response)
    }
}