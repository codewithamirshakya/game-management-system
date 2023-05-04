import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { WithdrawBalanceDto as MainWithdrawBalanceDto } from "../main/withdrawBalance.dto";

export class WithdrawBalanceDto {
  constructor(dto: MainWithdrawBalanceDto) {
    this.amount = dto.amount;
    this.eTransID = dto.transid;
    this.euID = dto.euID;
    this.uID = dto.uID;
    this.output = dto.output;
    this.tcheck = dto.tcheck;
  }
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(40)
  readonly eTransID: string;


  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(16)
  readonly euID: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(1)
  readonly output: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(1)
  readonly tcheck: string;

  @ValidateIf(x => x.euID === undefined)
  @MaxLength(16,{message: 'Either (uID or euID) must be shorter than or equal to 16 characters'})
  @IsString({message: 'Either (uID or euID) parameter must be string.'})
  @IsNotEmpty({message: 'Either (uID or euID) parameter is required.'})
  @ApiProperty()
  readonly uID: string;

}