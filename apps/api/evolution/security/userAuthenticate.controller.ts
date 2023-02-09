import { Body, Controller, Ip, Post, Req, Res, } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  AuthenticateService
} from "../../../../src/modules/core/security/application/services/evolution/authenticate.service";
import {
  AuthenticateDto
} from "../../../../src/modules/core/security/application/dto/request/evolution/authenticate.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Evolution')
@Controller('evolution/security/user-authenticate')
export class UserAuthenticateController extends AbstractController{
  constructor(
    private service : AuthenticateService,
  ) {
    super();
  }

  @Post()
  async get(@Body() dto: AuthenticateDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.authenticate(dto,req,ip);
    this.successResponse(res,'User authenticated successfully.',response)
  }
}