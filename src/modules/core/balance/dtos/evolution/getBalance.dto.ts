import {  IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GetBalanceDto as MainGetBalanceDto } from "../main/getBalance.dto";

export class GetBalanceEvolutionDto {

  constructor(dto: MainGetBalanceDto) {
    this.euID = dto.euID;
    this.uID = dto.uID;
    this.output = dto.output;
  }

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

  
  @ValidateIf(x => x.euID === undefined)
  @MaxLength(16,{message: 'Either (uID or euID) must be shorter than or equal to 16 characters'})
  @IsString({message: 'Either (uID or euID) parameter must be string.'})
  @IsNotEmpty({message: 'Either (uID or euID) parameter is required.'})
  @ApiProperty()
  readonly uID: string;

}