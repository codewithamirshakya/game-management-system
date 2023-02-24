import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class GetBalanceDto extends DataTransferObject{

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiPropertyOptional()
  @IsOptional()
  readonly currenttime: number;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  readonly atype: number;

}