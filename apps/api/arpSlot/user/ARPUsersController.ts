import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { GetUserService } from "../../../../src/core/user/application/services/arpSlot/getUser.service";
import { CreateUserDto } from "../../../../src/core/user/application/dtos/request/arpSlot/create.user.dto";
import { CreateUserService } from "../../../../src/core/user/application/services/arpSlot/create.user.service";

@Controller('arp/users')
export class ARPUsersController {
  constructor(
     private getUserService: GetUserService,
     private createUserService: CreateUserService,
  ) {}

  @Get('/:id')
  async get(@Param('id', new ParseUUIDPipe()) id) {
    return await this.getUserService.getById(id);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    return await this.createUserService.create(createUserDTO);
  }
}
