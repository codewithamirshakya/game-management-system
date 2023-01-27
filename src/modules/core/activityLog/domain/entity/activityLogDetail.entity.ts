import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RecordActivityLogDetailDto } from "../dto/request/recordActivityLogDetail.dto";

@Entity()
export class ActivityLogDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  activity_log_id: number;

  @Column({nullable: true})
  objectId: string;

  @Column({nullable: true})
  objectClass: string;

  public static recordActivityLogDetail(dto: RecordActivityLogDetailDto) {
    let activityLog = new ActivityLogDetail();
    activityLog.activity_log_id = dto.logId;
    activityLog.objectId = dto.objectId;
    activityLog.objectClass = dto.objectClass;
    return activityLog;
  }

}