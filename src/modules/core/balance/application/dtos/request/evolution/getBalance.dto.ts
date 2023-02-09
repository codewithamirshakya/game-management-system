import {  IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetBalanceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly cCode: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(32)
  readonly ecID: string;

  
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

  
  @ValidateIf(x => x.euID === "")
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(16)
  readonly uID: string;

}