import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QueryToken {

    @IsString()
    @ApiProperty({ example: 's3cr3tV4lu3' })
    @IsNotEmpty()
    authToken: string;




}