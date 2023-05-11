import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { DepositBalanceDto as MainDepositBalanceDto } from "../main/depositBalance.dto";

export class VelaDepositBalanceDto {
  constructor(dto: MainDepositBalanceDto) {
    this.member_id = dto.member_id;
    this.amount= dto.amount;
    this.transid = dto.transid;
    this.host_id = dto.host_id;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly member_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly host_id: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly transid: string;

}