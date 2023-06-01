import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { WithdrawBalanceDto as MainWithdrawBalanceDto } from "../main/withdrawBalance.dto";

export class OpgmWithDrawBalanceDto {
  constructor(dto: MainWithdrawBalanceDto) {
    this.amount= dto.amount;
    this.patron = dto.patron;
    this.id = dto.id;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly patron: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

}