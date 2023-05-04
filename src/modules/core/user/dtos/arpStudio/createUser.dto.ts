import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateUserDto as MainCreateUserDto } from "../main/createUser.dto";
export class CreateUserArpStudioDto {
  constructor(dto: MainCreateUserDto) {
    this.username = dto.username;
    this.nickname = dto.nickname;
  }

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public readonly username: string;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  readonly nickname: string;

}