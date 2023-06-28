import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DetailBetDto  } from "../main/detail.dtos";
export class GetArpstudioBetDto {
  constructor(dto: DetailBetDto) {
    this.username = dto.username;
    this.notifyid = dto.notifyid;
    this.atype = dto.atype;
    this.begintime = dto.begintime;
    this.endtime = dto.endtime;
    this.index = dto.index;
    this.size= dto.size;
  }

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly notifyid: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  readonly atype: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly begintime: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly endtime: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly index: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly size: number;






}