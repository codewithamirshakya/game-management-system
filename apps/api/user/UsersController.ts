import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { GetUserService } from "../../../src/modules/core/user/application/services/getUser.service";
import { CreateUserDto } from "../../../src/modules/core/user/application/dtos/request/create.user.dto";
import { UserDTO } from "../../../src/modules/core/user/application/dtos/response/user.dto";
import { CreateUserService } from "../../../src/modules/core/user/application/services/create.user.service";
import { Serialize } from "../../../src/lib/interceptors/serialize.interceptor";

@Serialize(UserDTO)
@Controller('arp/users')
export class UsersController {
  constructor(
    private getUserService: GetUserService,
    private createUserService: CreateUserService,
  ) {
  }

  @Get('/:id')
  async get(@Param('id', new ParseUUIDPipe()) id) {
    return await this.getUserService.getById(id);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    return await this.createUserService.create(createUserDTO);
  }
}
