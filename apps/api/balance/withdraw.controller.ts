import { Body, Controller, Ip, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";

import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ArpStudioWithdrawService } from "@src/modules/core/balance/services/arpStudio/withdraw.service";
import { WithdrawBalanceDto } from "@src/modules/core/balance/dtos/main/withdrawBalance.dto";
import { ArpStudioWithdrawBalanceDto } from "@src/modules/core/balance/dtos/arpStudio/withdrawBalance.dto";
import { VelaWithdrawBalanceService } from "@src/modules/core/balance/services/vela/withdraw-balance.service";
import { VelaWithdrawBalanceDto } from "@src/modules/core/balance/dtos/vela/withdrawBalance.dto";

@ApiTags('Balance')
@Controller('balance/withdraw')
export class WithdrawController extends AbstractController{
  constructor(
    private arpStudioWithdrawService : ArpStudioWithdrawService,
    private velaWithdrawService : VelaWithdrawBalanceService,
    // private evolutionWithdrawService : EvolutionWithdrawService,
  ) {super();}

  @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Body() dto: WithdrawBalanceDto,@Res() res : Response,@Req() req, @Ip() ip) {
    const response = await this.requestService(dto,req,ip);
    this.successResponse(res,'User balance withdrawn successfully.',response)
  }

  async requestService(dto : WithdrawBalanceDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        // console.log(new ArpStudioWithdrawBalanceDto(dto));
        return await this.arpStudioWithdrawService.withdrawBalance(new ArpStudioWithdrawBalanceDto(dto));
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.velaWithdrawService.withdrawBalance(new VelaWithdrawBalanceDto(dto));
      }
      // case GamingProviderEnum.EVOLUTION: {
      //   return await this.evolutionWithdrawService.withdrawBalance(new EvolutionWithdrawBalanceDto(dto),req,ip);
      // }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}