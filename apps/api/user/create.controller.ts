import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AbstractController } from "../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { UpdateUserService as ArpStudioUpdateUserService } from "../../../src/modules/core/user/application/services/arpStudio/update.user.service";
import { UpdateUserDto } from "../../../src/modules/core/user/application/dtos/request/common/updateUser.dto";
import { UpdateUserDto as ArpStudioUpdateUserDto } from "../../../src/modules/core/user/application/dtos/request/arpStudio/update.user.dto";
import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { CreateUserDto } from "src/modules/core/user/dtos/main/createUser.dto";
import { CreateUserArpStudioDto } from "src/modules/core/user/dtos/arpStudio/createUser.dto";
import { ArpStudioCreateUserService } from "src/modules/core/user/services/arpstudio/createUser.service";
import { ApiTags } from "@nestjs/swagger";
import { VelaCreateUserService } from "src/modules/core/user/services/vela/createUser.service";
import { CreatVelaUserDto } from "src/modules/core/user/dtos/vela/createUser.dto";
@ApiTags('User')
@Controller('user/create')
export class CreateController extends AbstractController {
  constructor(
    private arpStudioCreateUserService: ArpStudioCreateUserService,
    private velaCreateUserService: VelaCreateUserService,
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
        return await this.arpStudioCreateUserService.create(new CreateUserArpStudioDto(dto),req,ip);
      }

       case GamingProviderEnum.VELA_GAMING: {
        return await this.velaCreateUserService.create(new CreatVelaUserDto(dto),req,ip);
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}