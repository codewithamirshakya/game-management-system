import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DepositBalanceDto as MainDepositBalanceDto } from "../main/depositBalance.dto";

export class EvolutionDepositBalanceDto {

  constructor(dto: MainDepositBalanceDto) {
    this.currency = dto.currency;
    this.amount = dto.amount;
    this.eTransID = dto.transid;
    this.euID = dto.euID;
    this.uID = dto.uID;
    this.output = dto.output;
    this.tcheck = dto.tcheck;
    this.createuser = dto.createuser;
  }

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(3)
  readonly currency: string;

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
  @MaxLength(16, { message: 'Either (uID or euID) must be shorter than or equal to 16 characters' })
  @IsString({ message: 'Either (uID or euID) parameter must be string.' })
  @IsNotEmpty({ message: 'Either (uID or euID) parameter is required.' })
  @ApiProperty()
  readonly uID: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(1)
  readonly createuser: string;

}