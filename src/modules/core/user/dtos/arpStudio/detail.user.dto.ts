import { IsString, IsNotEmpty, IsOptional,IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GetDetailDto } from "../main/getDetail.dto";
export class DetailUserDto {

    constructor(dto: GetDetailDto) {
        this.username = dto.username;
        this.currenttime = dto.currenttime;
    }

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly currenttime: number;
}
