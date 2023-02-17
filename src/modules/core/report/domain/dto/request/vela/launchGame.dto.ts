import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";
enum GameMode {
    'singleplayer' = "singleplayer" ,
    'multiplayer'= "multiplayer",
}

enum Lang {
    'ch' = "ch" ,
    'en'= "en",
}

enum AllowVertical {
    'one' = 1 ,
    'zero'= 0,
}
export class LaunchGameDto extends DataTransferObject {
    readonly host_id: string;

    readonly access_token: string;

    readonly mode: GameMode;

    readonly lang: Lang;

    readonly allow_vertical: AllowVertical;
}
