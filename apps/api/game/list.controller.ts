import { Controller, Get, Ip, Post, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../src/modules/core/common/abstract.controller";
import { GamingProviderEnum } from "../../../src/modules/core/common/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ListGameDto } from "../../../src/modules/core/game/dtos/main/listGame.dto";
import { ListGameLobbyDto } from "../../../src/modules/core/game/dtos/arpStudio/listGameLobby.dto";
import { EvolutionListGameService } from "@src/modules/core/game/services/evolution/listGame.service";
import { VelaListGameService } from "@src/modules/core/game/services/vela/listGame.service";
import { ArpStudioListGameService } from "@src/modules/core/game/services/arpStudio/listGameservice";
import { OpmgGameListService } from "@src/modules/core/game/services/opmg/listGame.service";
import { OPMGListGameDto } from "@src/modules/core/game/dtos/opmg/listGame.dto";

@ApiTags('Game List')
@Controller('games/list')
export class GameListController extends AbstractController{
  constructor(
    private evolutionService : EvolutionListGameService,
    private velaService : VelaListGameService,
    private arpStudioService : ArpStudioListGameService,
    private opmgGameListService : OpmgGameListService,
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
        return await this.arpStudioService.getArpStudioGameList(new ListGameLobbyDto(dto),req,ip);
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.evolutionService.getActiveGamesList();
      }
      case GamingProviderEnum.VELA_GAMING: {
        return await this.velaService.getList();
      }
      case GamingProviderEnum.OPMG: {
        return await this.opmgGameListService.getList(new OPMGListGameDto(dto));
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}