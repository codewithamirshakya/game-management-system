import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GetBalanceDto as MainGetBalanceDto } from "../main/getBalance.dto";

export class GetBalanceOpmgDto {

    constructor(dto: MainGetBalanceDto) {
        this.patron = dto.username;

      }

  @IsString()
  @ApiProperty({example: "test" })
  readonly patron: string;

}