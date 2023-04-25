import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {ArpStudioBalanceService} from "../../../src/modules/core/balance/application/services/arpStudio/getBalance.service";
import {GetVelaBalanceService,} from "../../../src/modules/core/balance/application/services/vela/getBalance.service";
import {GetEvolutionBalanceService} from "../../../src/modules/core/balance/application/services/evolution/getBalance.service";
import { GetBalanceDto } from "../../../src/modules/core/balance/application/dtos/request/main/getBalance.dto";
import { GetBalanceDto as VelaGetBalanceDto } from "../../../src/modules/core/balance/application/dtos/request/vela/getBalance.dto";
import { GetBalanceDto as EvolutionGetBalanceDto } from "../../../src/modules/core/balance/application/dtos/request/evolution/getBalance.dto";
import { GetBalanceDto as ArpStudioGetBalanceDto } from "../../../src/modules/core/balance/application/dtos/request/arpStudio/getBalance.dto";
import { Request } from "express";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('General')
@Controller("/balance/get")
export class GetController extends AbstractController {
  constructor(
    private getArpStudioBalanceService: ArpStudioBalanceService,
    private getVelaBalanceService: GetVelaBalanceService,
    private getEvolutionBalanceService: GetEvolutionBalanceService
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetBalanceDto, @Res() res: Response, @Req() req, @Ip() ip) {
    const response = await this.requestService(dto, req, ip);
    this.successResponse(res, "User balance info fetched successfully.", response);
  }

  async requestService(dto : GetBalanceDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.getArpStudioBalanceService.getBalance(new ArpStudioGetBalanceDto(dto),req,ip);
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.getEvolutionBalanceService.getBalance(new EvolutionGetBalanceDto(dto), req, ip);
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.getVelaBalanceService.getBalance(new VelaGetBalanceDto(dto.username),req,ip);
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}