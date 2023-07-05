import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class ChannelData {

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    readonly type: string;

}
export class CheckUserEvolutionDto {

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    sid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currency: string;


    @IsOptional()
    @ApiProperty()
    channel: ChannelData;

}