import {  IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GetBalanceDto as MainGetBalanceDto } from "../main/getBalance.dto";

export class GetBalanceEvolutionDto {

  constructor(dto: MainGetBalanceDto) {
    this.euID = dto.username;
  }

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(16)
  readonly euID: string;

  // @ValidateIf(x => x.euID === undefined)
  // @MaxLength(16,{message: 'Either (uID or euID) must be shorter than or equal to 16 characters'})
  // @IsString({message: 'Either (uID or euID) parameter must be string.'})
  // @IsNotEmpty({message: 'Either (uID or euID) parameter is required.'})
  // @ApiProperty()
  // readonly uID: string;

}