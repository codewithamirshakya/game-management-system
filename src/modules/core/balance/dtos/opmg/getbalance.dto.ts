import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GetBalanceDto as MainGetBalanceDto } from "../main/getBalance.dto";

export class GetBalanceOpmgDto {

    constructor(dto: MainGetBalanceDto) {
        this.un = dto.username;
        this.fullname = dto.fullname;
        this.pin = dto.pin;
        this.cardlevel = dto.card_level;
        this.ip = dto.ip;
        this.userid = dto.user_id;


      }
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly fullname: string;

  @IsString()
  @ApiProperty({example: "test" })
  readonly un: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({example: "PHP" })
  @IsOptional()
  readonly currency: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly pin: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly cardlevel: string;


  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly ip: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @ApiPropertyOptional()
  @IsOptional()
  readonly userid: number;


}