import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";

export class GetRenderedResultDto extends DataTransferObject{
    readonly token: string;
    readonly gameHeader?: boolean;
}
