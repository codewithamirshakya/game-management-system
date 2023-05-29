import { Body, Controller, Ip, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AbstractController } from "@src/modules/core/common/abstract.controller";

import { GamingProviderEnum } from "../../../src/modules/core/shared/domain/interface/RequestInterface";
import {
  UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { ApiTags } from "@nestjs/swagger";
import { UpdateArpStudioUserService } from "@src/modules/core/user/services/arpstudio/updateUser.service";
import { UpdateUserDto } from "@src/modules/core/user/dtos/main/updateUser.dto";
import { ArpStudioUpdateUserDto } from "@src/modules/core/user/dtos/arpStudio/updateUser.dto";
@ApiTags('User')
@Controller('user/update')
export class UpdateController extends AbstractController {
  constructor(
    private arpStudioUpdateUserService: UpdateArpStudioUserService
  ) {
    super();
  }

  @Post()
  async update(@Body() updateUserDto: UpdateUserDto, @Res() res : Response,@Req() req, @Ip() ip) {
    const response = await this.requestService(updateUserDto,req,ip);
    this.successResponse(res,'User updated successfully.',response)
  }

  async requestService(dto : UpdateUserDto, req: Request, ip: string) {

    switch (dto.gameProvider) {
      case GamingProviderEnum.ARP_STUDIO: {
        return await this.arpStudioUpdateUserService.update(new ArpStudioUpdateUserDto(dto),req,ip);
      }
      default:
        throw new UnknownGamingProviderException();
    }
  }
}