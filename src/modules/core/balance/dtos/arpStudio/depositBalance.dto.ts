import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DepositBalanceDto } from "../main/depositBalance.dto";

export class ArpStudioDepositBalanceDto {

  constructor(dto: DepositBalanceDto) {
    this.username = dto.username;
    // this.currenttime = dto.currenttime;
    this.notifyid = dto.notifyid;
    this.amount = dto.amount;
    this.source = dto.source;
    this.atype = dto.atype;
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

  @IsNumber()
  @IsPositive()
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