import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ListGameDto } from "../main/listGame.dto";

export class OPMGListGameDto {
    constructor(dto: ListGameDto) {
        this.opmg = dto.opmg;
        this.arps = dto.arps;
        this.show = dto.show;
    }

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly opmg: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly arps: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly show: string;
}
