import {
  Controller,
  Get, Ip, Query, Req, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
// import { GetDetailDto } from "../../../src/modules/core/user/application/dtos/request/common/getDetail.dto";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";

import { DetailDto } from "../../../src/modules/core/user/application/dtos/request/evolution/detail.dto";
import { ApiTags } from "@nestjs/swagger";
import { GetDetailDto } from "@src/modules/core/user/dtos/main/getDetail.dto";
import { DetailUserDto } from "@src/modules/core/user/dtos/arpStudio/detail.user.dto";
import { GetUserDetailArpStudioService } from "@src/modules/core/user/services/arpstudio/getUserDetail.service";
import { GetUserDetailEvolutionService } from "@src/modules/core/user/services/evolution/getDetail.service";
@ApiTags('User')
@Controller('user/detail')
export class UserDetailController extends AbstractController{
  constructor(
    private detailUserService :GetUserDetailArpStudioService ,

    private evolutionDetailUserService : GetUserDetailEvolutionService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetDetailDto,@Res() res : Response,@Req() req, @Ip() ip) {
    const response = await this.requestService(dto,req,ip);
    this.successResponse(res,'User info fetched successfully.',response)
  }

  async requestService(dto : GetDetailDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.detailUserService.getDetail(new DetailUserDto(dto),req,ip);
      }
      case GamingProviderEnum.EVOLUTION: {
        return await this.evolutionDetailUserService.getDetail(new DetailDto(dto), req, ip);
      }
      // case GamingProviderEnum.VELA_GAMING: {
      //   return await this.getVelaBalanceService.getBalance(new VelaGetBalanceDto(dto.username),req,ip);
      // }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}
