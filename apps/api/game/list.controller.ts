import { Controller, Get, Ip, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { ListGameService as EvolutionListGameService} from "../../../src/modules/core/game/application/services/evolution/listGame.service";
import { ListGameLobbyService as ArpStudioListGameLobbyService} from "../../../src/modules/core/game/application/services/arpStudio/listGameLobby.service";
import { ListGameService as VelaListGameService} from "../../../src/modules/core/game/application/services/vela/listGame.service";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ListGameDto } from "../../../src/modules/core/game/application/dtos/request/main/listGame.dto";
import { ListGameLobbyDto } from "../../../src/modules/core/game/application/dtos/request/arpStudio/listGameLobby.dto";

@ApiTags('General')
@Controller('games/list')
export class ListController extends AbstractController{
  constructor(
    private evolutionService : EvolutionListGameService,
    private velaService : VelaListGameService,
    private arpStudioService : ArpStudioListGameLobbyService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: ListGameDto, @Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.requestService(dto,req,ip);
    this.successResponse(res,'Active Games list fetched successfully.',response)
  }
  async requestService(dto : ListGameDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.arpStudioService.getList(new ListGameLobbyDto(dto),req,ip);
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.evolutionService.getActiveGamesList(dto, req, ip);
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.velaService.getList();
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}