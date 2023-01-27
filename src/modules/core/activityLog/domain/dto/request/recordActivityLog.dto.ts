import { DataTransferObject } from "../../../../../../lib/dto/dataTransferObject";

export class RecordActivityLogDto extends DataTransferObject{
  public readonly gamingProvider : number;
  public readonly activityType : string;
  public readonly description: string;
  public readonly user_id?: number;
  public readonly ipAddress?: string;
  public readonly browserAgent?: string;
  public readonly objectId?: string;
  public readonly objectClass?: string;
}