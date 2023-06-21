import {
  Controller,
  Get, Query, Res
} from "@nestjs/common";
import { GetArpstudioBetDto } from "@src/modules/core/bet/dtos/arpstudio/detail.dtos";
import { DetailBetDto } from "@src/modules/core/bet/dtos/main/detail.dtos";
import { GetArpstudioBetDetailService } from "@src/modules/core/bet/services/arpstudio/detail.service";
import { AbstractController } from "@src/modules/core/common/abstract.controller";
import { UnknownGamingProviderException } from "@src/modules/core/common/exception/unknownGamingProvider.exception";
import { Response } from "express";
import { GamingProviderEnum } from "../../../src/modules/core/common/interface/RequestInterface";
import { OpmgBetDetailService } from "@src/modules/core/bet/services/opmg/detail.service";
import { EvolutionBetDetailService } from "@src/modules/core/bet/services/evolution/betDetail.service";
import { ApiTags } from "@nestjs/swagger";
import { EvolutionBetDto } from "@src/modules/core/bet/dtos/evolution/detail.dtos";

@ApiTags('Bet')
@Controller('bet/detail')
export class BetDetailController extends AbstractController {
  constructor(
    private detailBetService: GetArpstudioBetDetailService,
    private detailOpmgBetService: OpmgBetDetailService,
    private detailEvolutionBetService: EvolutionBetDetailService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: DetailBetDto, @Res() res: Response) {
    const response = await this.requestService(dto);
    this.successResponse(res, 'User bet records fetched successfully.', response)
  }
  async requestService(dto: DetailBetDto) {
    switch (dto.gameProvider) {

      case GamingProviderEnum.ARP_STUDIO: {
        return await this.detailBetService.getDetail(new GetArpstudioBetDto(dto));
      }

      case GamingProviderEnum.OPMG: {
        return await this.detailOpmgBetService.getDetail();
      }

      case GamingProviderEnum.EVOLUTION: {
        return await this.detailEvolutionBetService.getDetail(new EvolutionBetDto(dto));
      }

      default:
        throw new UnknownGamingProviderException();
    }
  }

}
