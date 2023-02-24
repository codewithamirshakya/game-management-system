import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GamingProviderEnum, RequestInterface } from "../../../../../shared/domain/interface/RequestInterface";
import { BaseRequestDto } from "../../../../../shared/application/dto/baseRequest.dto";

export class DepositBalanceDto extends BaseRequestDto{

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly request: string;
}