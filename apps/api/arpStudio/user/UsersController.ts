import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { GetUserService } from "../../../../src/modules/core/user/application/services/getUser.service";
import { UserDTO } from "../../../../src/modules/core/user/application/dtos/response/user.dto";
import { Serialize } from "../../../../src/lib/interceptors/serialize.interceptor";
import { ApiParam, ApiProperty } from "@nestjs/swagger";

@Serialize(UserDTO)
@Controller('arp/users')
export class UsersController {
  constructor(
    private getUserService: GetUserService,
  ) {
  }

  @Get('/:id')
  @ApiParam({name:'id',required: true, description: 'Must be UUID format'})
  async get(@Param('id', new ParseUUIDPipe()) id) {
    return await this.getUserService.getById(id);
  }

  // @Post()
  // async create(@Body() createUserDTO: CreateUserDto) {
  //   return await this.createUserService.create(createUserDTO);
  // }
}
