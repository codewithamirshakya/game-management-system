import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RecordActivityLogDto } from "../dto/request/recordActivityLog.dto";
import { GamingProviderEnum } from "../../../shared/application/dto/apiRequest.dto";

@Entity()
export class ActivityLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: GamingProviderEnum})
  game_provider: GamingProviderEnum;

  @Column({type: 'int',nullable: true})
  user_id: number;

  @Column()
  activityType: string;

  @Column({type: 'text'})
  description: string;

  @Column({nullable: true})
  ipAddress: string;

  @Column({nullable: true})
  browserAgent: string;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
  log_time: Date;

  public static recordActivityLog(dto: RecordActivityLogDto) {
    let activityLog = new ActivityLogs();
    activityLog.user_id = dto.user_id;
    activityLog.description = dto.description;
    activityLog.browserAgent = dto.browserAgent;
    activityLog.ipAddress = dto.ipAddress;
    activityLog.activityType = dto.activityType;
    activityLog.game_provider = dto.gamingProvider;
    return activityLog;
  }
}