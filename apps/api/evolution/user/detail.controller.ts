import { Controller, Get, Ip, Query, Req, Res } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import {
  GetUserDetailService
} from "../../../../src/modules/core/user/application/services/evolution/getUser.detail.service";
import {DetailDto} from "../../../../src/modules/core/user/application/dtos/request/evolution/detail.dto";

@ApiTags('Evolution')
@Controller('evolution/user/detail')
export class DetailController extends AbstractController{
  constructor(
    private service : GetUserDetailService,
  ) {
    super();
  }

  @Get()
  async get(@Query() dto: DetailDto,@Res() res : Response, @Req() req,@Ip() ip) {
    const response = await this.service.getDetail(dto,req,ip);
    this.successResponse(res,'Player\'s information fetched successfully.',response)
  }
}