import { DataTransferObject } from "../../../../../../lib/dto/dataTransferObject";

export class RecordActivityLogDetailDto extends DataTransferObject{
  public readonly logId: number;
  public readonly objectId: string;
  public readonly objectClass: string;
}