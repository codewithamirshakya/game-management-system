import { Controller, Get, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  AuthenticateService
} from "../../../../src/modules/core/security/application/services/vela/authenticate.service";
import { AuthenticateDto } from "../../../../src/modules/core/security/application/dto/vela/authenticate.dto";

@Controller('vela/security/authenticate')
export class AuthenticateController extends AbstractController{
  constructor(
    private service : AuthenticateService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: AuthenticateDto,@Res() res : Response) {
    const response = await this.service.authenticate(dto);
    this.successResponse(res,'User authenticated successfully.',response)
  }
}