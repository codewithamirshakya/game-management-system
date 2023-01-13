import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetBalanceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly appid: string;

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