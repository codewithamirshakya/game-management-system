import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength,ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

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
  @ApiPropertyOptional()
  @IsOptional()
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

  @Type(() => Session)
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly session: Session;

  @Type(() => Group)
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly group: Group;

}

