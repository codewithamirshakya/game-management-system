import {DataTransferObject} from "../../../../../../../lib/dto/dataTransferObject";

export class DetailDto extends DataTransferObject{
  readonly cCode: string = 'GUI';
  readonly ecID: string;

  readonly euID: string;

  readonly output: string;

  readonly uID?: string;

}