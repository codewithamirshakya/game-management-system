import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { EvoutionCancelBalanceService } from "@src/modules/core/seamlessWallet/service/evolution/cancelBalance.service";
import { DepositEvoutionWalletDto } from "@src/modules/core/seamlessWallet/dtos/evoution/depositBalance.dtos";
import { CheckUserEvolutionDto } from "@src/modules/core/seamlessWallet/dtos/evoution/checkUser.dtos";
import { CheckUserService } from "@src/modules/core/seamlessWallet/service/evolution/checkUser.service";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";

@ApiTags('Seamless Wallet')
@Controller("/evoultion/check/user")
export class CheckUserController extends AbstractController {
    constructor(
        private checkUserService: CheckUserService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken,@Body() dto: CheckUserEvolutionDto, @Res() res: Response) {
        const requestBody={queryDto,dto}
        const response = await this.checkUserService.checkUser(requestBody);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}