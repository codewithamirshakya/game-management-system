import { Body, Controller, Ip, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { WithdrawBalanceDto } from "../../../src/modules/core/balance/application/dtos/request/main/withdrawBalance.dto";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  WithdrawBalanceDto as VelaWithdrawBalanceDto
} from "../../../src/modules/core/balance/application/dtos/request/vela/withdrawBalance.dto";
import {
  WithdrawBalanceDto as EvolutionWithdrawBalanceDto
} from "../../../src/modules/core/balance/application/dtos/request/evolution/withdrawBalance.dto";
import {
  WithdrawBalanceDto as ArpStudioWithdrawBalanceDto
} from "../../../src/modules/core/balance/application/dtos/request/arpStudio/withdrawBalance.dto";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { WithdrawService as ArpStudioWithdrawService } from "../../../src/modules/core/balance/application/services/arpStudio/withdraw.service";
import { WithdrawBalanceService as VelaWithdrawService } from "../../../src/modules/core/balance/application/services/vela/withdrawBalance.service";
import { WithdrawBalanceService as EvolutionWithdrawService } from "../../../src/modules/core/balance/application/services/evolution/withdrawBalance.service";

@ApiTags('General')
@Controller('balance/withdraw')
export class WithdrawController extends AbstractController{
  constructor(
    private arpStudioWithdrawService : ArpStudioWithdrawService,
    private velaWithdrawService : VelaWithdrawService,
    private evolutionWithdrawService : EvolutionWithdrawService,
  ) {super();}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Body() dto: WithdrawBalanceDto,@Res() res : Response,@Req() req, @Ip() ip) {
    const response = await this.requestService(dto,req,ip);
    this.successResponse(res,'User balance withdrawn successfully.',response)
  }

  async requestService(dto : WithdrawBalanceDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.arpStudioWithdrawService.withdrawBalance(new ArpStudioWithdrawBalanceDto(dto));
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.velaWithdrawService.withdrawBalance(new VelaWithdrawBalanceDto(dto));
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.evolutionWithdrawService.withdrawBalance(new EvolutionWithdrawBalanceDto(dto),req,ip);
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}