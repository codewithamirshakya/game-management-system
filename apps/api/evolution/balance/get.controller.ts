import { GetBalanceDto } from "../../../../src/modules/core/balance/application/dtos/request/evolution/getBalance.dto";
import { Controller, Get, Ip, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { GetEvolutionBalanceService } from 'src/modules/core/balance/application/services/evolution/getBalance.service';

@ApiTags('Evolution')
@Controller('evolution/balance/get')
export class GetController extends AbstractController{
  constructor(
    private service : GetEvolutionBalanceService,
  ) {
    super();
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() dto: GetBalanceDto,@Res() res : Response, @Req() req,@Ip() ip) {

    const response = await this.service.getBalance(dto,req,ip);
    this.successResponse(res,'Player balance fetched successfully.',response)
  }
}