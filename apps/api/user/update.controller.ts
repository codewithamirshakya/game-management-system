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

@Controller('user/update')
export class UpdateController extends AbstractController {
  constructor(
    private arpStudioUpdateUserService: ArpStudioUpdateUserService
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