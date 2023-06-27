import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTestDto {


    @IsString()
    @ApiProperty()
    @IsOptional()
    readonly title: string;

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @ApiProperty()
    readonly description: string;

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @ApiProperty()
    readonly name: string;


}
