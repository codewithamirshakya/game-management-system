import {
  Controller,
  Get, Query, Res, UsePipes, ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import {
  GetUserAccountDetailService
} from "../../../../src/modules/core/account/application/services/arpStudio/getUserAccount.detail.service";
import {
  DetailAccountDto
} from "../../../../src/modules/core/account/application/dtos/request/arpStudio/detail.account.dto";

@Controller('arp-studio/account/detail')
export class DetailController extends AbstractController{
  constructor(
    private detailService : GetUserAccountDetailService,
  ) {
    super();
  }

  @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: DetailAccountDto,@Res() res : Response) {
    const response = await this.detailService.getDetail(dto);
    this.successResponse(res,'User account details fetched successfully.',response)
  }
}
