import { Body, Controller, Post, Res } from "@nestjs/common";
import { AbstractController } from "../../../../src/modules/shared/infrastructure/controller/api/abstract.controller";
import { Response } from "express";
import {
  UpdateUserService
} from "../../../../src/modules/core/user/application/services/arpStudio/update.user.service";
import { UpdateUserDto } from "../../../../src/modules/core/user/application/dtos/request/arpStudio/update.user.dto";

@Controller('arp-studio/user/update')
export class UpdateController extends AbstractController {
  constructor(
    private updateUserService: UpdateUserService
  ) {
    super();
  }

  @Post()
  async login(@Body() updateUserDto: UpdateUserDto, @Res() res : Response){
    const response = await this.updateUserService.update(updateUserDto);
    this.successResponse(res,'User updated successfully.',response)
  }
}