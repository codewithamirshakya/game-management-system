import {  IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GetDetailDto } from "../common/getDetail.dto";

export class DetailDto {
  constructor(dto: GetDetailDto) {
    this.euID = dto.username;
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