import { Body, Controller, HttpStatus, Ip, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request, Response } from "express";
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
import { EvolutionDepositBalanceService } from "@src/modules/core/balance/services/evolution/deposit-balance.service";
import { EvolutionDepositBalanceDto } from "@src/modules/core/balance/dtos/evolution/depositBalance.dto";
import { AbstractController } from "../../../src/modules/core/common/abstract.controller";
import { OpgmDepositBalanceDto } from "../../../src/modules/core/balance/dtos/opmg/deposit.dto";
import { OpmgDepositService } from "../../../src/modules/core/balance/services/opmg/deposit.balance.service";

@ApiTags('Balance')
@Controller('balance/deposit')
export class DepositController extends AbstractController{
  constructor(
    private arpStudioDepositService : ArpStudioDepositService,
    private velaDepositService : VelaDepositBalanceService,
    private evolutionDepositService : EvolutionDepositBalanceService,
    private opmgDepositService : OpmgDepositService,
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
      case GamingProviderEnum.EVOLUTION: {
        return await this.evolutionDepositService.depositBalance(new EvolutionDepositBalanceDto(dto),req,ip);
      }
      case GamingProviderEnum.OPMG: {
        return await this.opmgDepositService.depositBalance(new OpgmDepositBalanceDto(dto));
      }
      default:
        throw new UnknownGamingProviderException('Game provider not found');
    }
  }
}