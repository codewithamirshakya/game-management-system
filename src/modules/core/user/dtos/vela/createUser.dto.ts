import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateUserDto as MainCreateUserDto } from "../main/createUser.dto";

export class CreatVelaUserDto {

    constructor(dto: MainCreateUserDto) {
        this.host_id = dto.host_id;
        this.member_id = dto.username;
        this.currency = dto.currency;

      }
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly host_id: string;

  @IsString()
  @ApiProperty({example: "test" })
  readonly member_id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({example: "PHP" })
  @IsOptional()
  readonly currency: string;
}