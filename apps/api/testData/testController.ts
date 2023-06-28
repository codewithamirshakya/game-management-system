import { Controller, Get, Ip, Param, Post, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AbstractController } from "../../../src/modules/core/common/abstract.controller";
import { ListGameDto } from "../../../src/modules/core/game/dtos/main/listGame.dto";
import { CreateTestDto } from "@src/modules/core/testData/dtos/test.dtos";
import { TestDataService } from "@src/modules/core/testData/service/test.service";
import { ListUserDto } from "@src/modules/core/testData/dtos/list.dtos";
import { QueryResponse } from "@src/modules/core/common/interface/RequestInterface";
import { QueryUtils } from "@src/modules/core/utils/query.utils";

@ApiTags('Test Data')
@Controller('test-data')
export class TestController extends AbstractController{
  constructor(
    private testDataService : TestDataService,
    private readonly queryUtils: QueryUtils
  ) {
    super();
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
   async getUser(@Query() query:ListUserDto,@Res() res : Response) {
      const args = {
          ...(await this.queryUtils.getQueryParams(query)),
        };
      const data= await this.testDataService.getTestDataList({
          attributes: {
              ...args,
            },
      });
      const response: QueryResponse = {
          totalRecords: data.count,
          totalPages: Math.ceil(data.count / args.limit),
          page: args.page,
          limit: args.limit,
          data: data.data,
        };
      this.successResponse(res,'Test Data fetched successfully.',response)

  }

  @Post()
  async create (@Query() dto: CreateTestDto, @Res() res : Response) {
    const response = await  this.testDataService.createTestData(dto);
    this.successResponse(res,'data Created successfully.',response)
  }


  @Get(':id')
   async get(@Param() params,@Res() res : Response) {
    const response = await  this.testDataService.getDataById(params.id);
    this.successResponse(res,'data fetch successfully.',response)
  }

}