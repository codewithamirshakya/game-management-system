import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  DepositBalanceDto as MainDepositBalanceDto
} from "../../../../application/dtos/request/main/depositBalance.dto";
export class DepositBalanceDto {
  constructor(dto: MainDepositBalanceDto) {
    this.member_id = dto.username;
    this.amount= dto.amount;
    this.transid = dto.transid;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly member_id: string;

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