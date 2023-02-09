import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class Session {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(250)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ip: string;
}

enum GroupAction {
  'assign' = "assign" ,
  'clear'= "clear",
}

class Group {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(50)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ['assign', 'clear']})
  @IsEnum(GroupAction)
  readonly action: GroupAction;
}
export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly update: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(2)
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly language: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(3)
  readonly currency: string;

  @IsObject()
  @ApiProperty()
  @IsNotEmpty()
  readonly session: Session;

  @IsObject()
  @ApiProperty()
  @IsNotEmpty()
  readonly group: Group;

}

