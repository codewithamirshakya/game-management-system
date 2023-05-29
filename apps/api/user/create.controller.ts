import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { CreateUserDto } from "../../../src/modules/core/user/dtos/main/createUser.dto";
import { CreateUserArpStudioDto } from "../../../src/modules/core/user/dtos/arpStudio/createUser.dto";
import { ArpStudioCreateUserService } from "../../../src/modules/core/user/services/arpstudio/createUser.service";
import { ApiTags } from "@nestjs/swagger";
import { VelaCreateUserService } from "../../../src/modules/core/user/services/vela/createUser.service";
import { CreatVelaUserDto } from "../../../src/modules/core/user/dtos/vela/createUser.dto";
import { EvolutionCreateUserService } from "../../../src/modules/core/user/services/evolution/createUser.service";
import { AbstractController } from "@src/modules/core/common/abstract.controller";
// import { CreateEvolutionUserDto } from "@src/modules/core/user/dtos/evolution/createUser.dto";
@ApiTags('User')
@Controller('user/create')
export class CreateController extends AbstractController {
  constructor(
    private arpStudioCreateUserService: ArpStudioCreateUserService,
    private velaCreateUserService: VelaCreateUserService,
    private evelutionCreateUserService: EvolutionCreateUserService,
  ) {
    super();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res : Response,@Req() req, @Ip() ip) {
    const response = await this.requestService(createUserDto,req,ip);
    this.successResponse(res,'User Created successfully.',response)
  }

  async requestService(dto : CreateUserDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.arpStudioCreateUserService.create(new CreateUserArpStudioDto(dto));
      }

       case GamingProviderEnum.VELA_GAMING: {
        return await this.velaCreateUserService.create(new CreatVelaUserDto(dto),req,ip);
      }

      case GamingProviderEnum.EVOLUTION: {

        return await this.evelutionCreateUserService.create(dto,req,ip);
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}