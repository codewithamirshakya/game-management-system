import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";

export class GetRenderedResultByGameIDDto extends DataTransferObject{
    readonly gameId: string;
    readonly gameHeader?: boolean;
    readonly gameProvider?: string;
}
