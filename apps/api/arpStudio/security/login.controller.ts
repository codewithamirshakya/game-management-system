import { Body, Controller, Ip, Post, Res } from "@nestjs/common";
import { LoginService } from "../../../../src/modules/core/security/application/services/arpStudio/login.service";
import { LoginArpStudioDto } from "../../../../src/modules/core/security/application/dto/request/login.arpStudio.dto";
import { Response } from 'express';
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";

@Controller('arp-studio/security/login')
export class LoginController extends AbstractController {
  constructor(
    private loginService:LoginService
  ) {
    super();
  }

  @Post()
  async login(@Body() arpStudioLoginDTO: LoginArpStudioDto,@Res() res : Response, @Ip() ip){
    const response = await this.loginService.login(arpStudioLoginDTO,ip);
    this.successResponse(res,'Logged in successfully.',response)
  }
}