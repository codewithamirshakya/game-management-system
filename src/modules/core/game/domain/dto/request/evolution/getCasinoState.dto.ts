import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";

enum GameVerticalEnum {
    'live'= 'live',
    'rng' = 'rng',
    'slots' = 'slots'
}

enum GameProviderEnum {
    'evolution'= 'evolution',
    'redtiger' = 'redtiger',
    'netent' = 'netent',
    'btg'= 'btg',
    'nlc' = 'nlc'
}
export class GetCasinoStateDto extends DataTransferObject{
    readonly gameVertical: GameVerticalEnum;

    readonly gameProvider: GameProviderEnum;
}
