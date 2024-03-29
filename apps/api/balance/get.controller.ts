import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ArpStudioBalanceService } from "@src/modules/core/balance/services/arpStudio/getBalance.service";
import { GetVelaBalanceService, } from "@src/modules/core/balance/services/vela/getBalance.service";
import { GetEvolutionBalanceService } from "@src/modules/core/balance/services/evolution/getBalance.service";
import { GetBalanceDto } from "@src/modules/core/balance/dtos/main/getBalance.dto";
import { GetBalanceDto as VelaGetBalanceDto } from "@src/modules/core/balance/dtos/vela/getBalance.dto";
import { GetBalanceEvolutionDto as EvolutionGetBalanceDto } from "@src/modules/core/balance/dtos/evolution/getBalance.dto";
import { GetBalanceDto as ArpStudioGetBalanceDto } from "@src/modules/core/balance/dtos/arpStudio/getBalance.dto";
import { Request } from "express";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/common/exception/unknownGamingProvider.exception";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../src/modules/core/common/abstract.controller";
import { GetOpmgBalanceService } from "@src/modules/core/balance/services/opmg/get.balance.service";
import { GetBalanceOpmgDto } from "@src/modules/core/balance/dtos/opmg/getbalance.dto";


@ApiTags('Balance')
@Controller("/balance/get")
export class GetController extends AbstractController {
  constructor(
    private getArpStudioBalanceService: ArpStudioBalanceService,
    private getVelaBalanceService: GetVelaBalanceService,
    private getEvolutionBalanceService: GetEvolutionBalanceService,
    private getOpmgBalanceService: GetOpmgBalanceService

  ) {
    super();
  }

  @Get()
  async get(@Query() dto: GetBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
    const response = await this.requestService(dto, req, ip);
    this.successResponse(res, "User balance info fetched successfully.", response);

  }

  async requestService(dto: GetBalanceDto, req: Request, ip: string) {
    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.getArpStudioBalanceService.getBalance(new ArpStudioGetBalanceDto(dto), req, ip);
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.getEvolutionBalanceService.getBalance(new EvolutionGetBalanceDto(dto), req, ip);
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.getVelaBalanceService.getBalance(new VelaGetBalanceDto(dto.username), req, ip);
      }
      case GamingProviderEnum.OPMG: {
        return await this.getOpmgBalanceService.getBalance(new GetBalanceOpmgDto(dto));
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}