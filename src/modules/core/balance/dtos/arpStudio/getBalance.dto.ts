import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GetBalanceDto as MainGetBalanceDto } from "../main/getBalance.dto";
export class GetBalanceDto {
  constructor(dto: MainGetBalanceDto) {
    this.username = dto.username;
  }

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public readonly username: string;

  // @Transform(({ value }) => parseInt(value))
  // @IsInt()
  // @ApiPropertyOptional()
  // @IsOptional()
  // readonly currenttime: number;


}