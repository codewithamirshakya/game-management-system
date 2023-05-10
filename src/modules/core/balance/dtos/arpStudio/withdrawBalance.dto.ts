import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { WithdrawBalanceDto as MainWithdrawBalanceDto } from "../main/withdrawBalance.dto";

export class ArpStudioWithdrawBalanceDto {

  constructor(dto: MainWithdrawBalanceDto) {
    Object.assign(this,dto);
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly notifyid: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @IsInt()
  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly atype: number;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  readonly tradeno: number;

  @Transform(({ value }) => -value)
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiPropertyOptional()
  @IsOptional()
  readonly currenttime: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly source: string;

}