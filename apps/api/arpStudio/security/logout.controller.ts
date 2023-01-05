import { Body, Controller, Ip, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { LogoutArpStudioDto } from "../../../../src/modules/core/security/application/dto/request/logout.arpStudio.dto";
import { LogoutService } from "../../../../src/modules/core/security/application/services/arpStudio/logout.service";

@Controller('arp-studio/security/logout')
export class LogoutController extends AbstractController {
  constructor(
    private logoutService: LogoutService
  ) {
    super();
  }

  @Post()
  async login(@Body() logoutArpStudioDto: LogoutArpStudioDto,@Res() res : Response){
    const response = await this.logoutService.logout(logoutArpStudioDto);
    this.successResponse(res,'Log out successfully.',response)
  }
}