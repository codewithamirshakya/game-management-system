import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class LaunchLobbyDto {
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly host_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly access_token: string;
}
