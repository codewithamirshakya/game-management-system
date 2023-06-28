import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class ListUserDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    page: number;

    @ApiProperty({ example: 20 })
    @IsOptional()
    limit: number;

}
