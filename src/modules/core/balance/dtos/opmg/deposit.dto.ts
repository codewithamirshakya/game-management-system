import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { DepositBalanceDto as MainDepositBalanceDto } from "../main/depositBalance.dto";

export class OpgmDepositBalanceDto {
  constructor(dto: MainDepositBalanceDto) {
    this.amount= dto.amount;
    this.patron = dto.username;
    this.id = dto.id;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly patron: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

}