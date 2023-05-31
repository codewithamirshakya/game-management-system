import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateUserDto as MainCreateUserDto } from "../main/createUser.dto";

export class CreatOpmgUserDto {

    constructor(dto: MainCreateUserDto) {
        this.host_id = dto.host_id;
        this.un = dto.username;
        this.currency = dto.currency;
        this.pin = dto.pin;
        this.cardlevel = dto.card_level;
        this.ip = dto.ip;
        this.userid = dto.user_id;


      }
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly host_id: string;

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