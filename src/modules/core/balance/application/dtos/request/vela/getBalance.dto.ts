import {  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetBalanceDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly host_id?: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly member_id: string;

}