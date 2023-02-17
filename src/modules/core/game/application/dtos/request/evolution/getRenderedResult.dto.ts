import {IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetRenderedResultDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly token: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly gameHeader: boolean;
}
