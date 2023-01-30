import {  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetTransactionStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly host_id?: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly trans_id: string;

}