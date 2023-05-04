import {  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetBalanceDto {

  constructor(username: string) {
    this.member_id = username;
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly member_id: string;

}