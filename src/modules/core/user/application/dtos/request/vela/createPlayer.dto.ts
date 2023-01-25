import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly host_id: string;

  @IsString()
  @ApiProperty()
  readonly member_id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @IsOptional()
  readonly currency: string;
}