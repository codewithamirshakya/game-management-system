import {
  Controller,
  Get, Param, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { UserDTO } from "../../../../src/modules/core/user/application/dtos/response/user.dto";
import { Serialize } from "../../../../src/lib/interceptors/serialize.interceptor";
import { DetailUserDto } from "../../../../src/modules/core/user/application/dtos/request/arpStudio/detail.user.dto";
import {
  GetUserDetailService
} from "../../../../src/modules/core/user/application/services/arpStudio/getUser.detail.service";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";

@Serialize(UserDTO)
@Controller('arp-studio/user/info')
export class DetailController extends AbstractController{
  constructor(
    private detailUserService : GetUserDetailService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DetailUserDto,@Res() res : Response) {
    const response = await this.detailUserService.getDetail(dto);
    this.successResponse(res,'User info fetched successfully.',response)
  }
}
