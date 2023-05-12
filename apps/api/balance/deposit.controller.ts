import { Body, Controller, Ip, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Request, Response } from "express";
import { DepositBalanceService as EvolutionDepositService } from "../../../src/modules/core/balance/application/services/evolution/depositBalance.service";
import {
  DepositBalanceDto as EvolutionDepositBalanceDto
} from "../../../src/modules/core/balance/application/dtos/request/evolution/depositBalance.dto";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ApiTags } from "@nestjs/swagger";
import { ArpStudioDepositService } from "@src/modules/core/balance/services/arpStudio/depositBalance.service";
import { DepositBalanceDto } from "@src/modules/core/balance/dtos/main/depositBalance.dto";
import { ArpStudioDepositBalanceDto } from "@src/modules/core/balance/dtos/arpStudio/depositBalance.dto";
import { VelaDepositBalanceService } from "@src/modules/core/balance/services/vela/deposit-balance.service";
import { VelaDepositBalanceDto } from "@src/modules/core/balance/dtos/vela/depositBalance.dto";

@ApiTags('Balance')
@Controller('balance/deposit')
export class DepositController extends AbstractController{
  constructor(
    private arpStudioDepositService : ArpStudioDepositService,
    private velaDepositService : VelaDepositBalanceService,
    // private evolutionDepositService : EvolutionDepositService,
  ) {super();}

  @Post()
  async get(@Body() dto: DepositBalanceDto,@Res() res : Response,  @Req() req, @Ip() ip) {
    const response = await this.requestService(dto,req,ip);
    this.successResponse(res,'User balance deposited successfully.',response)
  }

  async requestService(dto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.arpStudioDepositService.depositBalance(new ArpStudioDepositBalanceDto(dto));
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.velaDepositService.depositBalance(new VelaDepositBalanceDto(dto));
      }
      // case GamingProviderEnum.EVOLUTION: {
      //   return await this.evolutionDepositService.depositBalance(new EvolutionDepositBalanceDto(dto),req,ip);
      // }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}