import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { WithdrawBalanceDto as MainWithdrawBalanceDto } from "../main/withdrawBalance.dto";

export class VelaWithdrawBalanceDto {

  constructor(dto: MainWithdrawBalanceDto) {
    this.member_id = dto.username;
    this.host_id = dto.host_id;
    this.amount = dto.amount;
    this.transid = dto.transid;
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