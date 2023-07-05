import { Body, Controller, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/core/common/abstract.controller";
import { CheckUserEvolutionDto } from "@src/modules/core/seamlessWallet/dtos/evoution/checkUser.dtos";
import { CheckUserService } from "@src/modules/core/seamlessWallet/service/evolution/checkUser.service";
import { QueryToken } from "@src/modules/core/seamlessWallet/dtos/evoution/queryDto";
import { PromoPayoutService } from "@src/modules/core/seamlessWallet/service/evolution/promoPayout.service";
import { PromoPayoutDto } from "@src/modules/core/seamlessWallet/dtos/evoution/promoPayout.dtos";

@ApiTags('Seamless Wallet')
@Controller("/evoultion/promo/payout")
export class PromoPayoutController extends AbstractController {
    constructor(
        private promoPayoutService: PromoPayoutService,
    ) {
        super();
    }

    @Post()
    async get(@Query() queryDto: QueryToken,@Body() dto: PromoPayoutDto, @Res() res: Response) {
        const requestBody={queryDto,dto}
        const response = await this.promoPayoutService.promoPayout(requestBody);
        this.successResponse(res,'Data fetched successfully.',response)
    }

}