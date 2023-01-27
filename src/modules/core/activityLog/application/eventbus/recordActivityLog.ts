import { EventDefinition } from "../../../shared/application/constants/eventDefinition";
import {  OnEvent } from "@nestjs/event-emitter";
import { ActivityCompletedEvent } from "../../../shared/domain/event/activityLog/activityCompleted.event";
import { RecordActivityLogDto } from "../../domain/dto/request/recordActivityLog.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { SaveActivityLogRepositoryInterface } from "../../domain/repository/saveActivityLog.repository.interface";
import { ActivityLogs } from "../../domain/entity/activityLogs.entity";
import {
  SaveActivityLogDetailRepositoryInterface
} from "../../domain/repository/saveActivityLogDetail.repository.interface";
import { RecordActivityLogDetailDto } from "../../domain/dto/request/recordActivityLogDetail.dto";
import { ActivityLogDetail } from "../../domain/entity/activityLogDetail.entity";


export class RecordActivityLog {
  constructor(
    @Inject(TYPES.repository.SaveActivityLogRepositoryInterface)
    private repo: SaveActivityLogRepositoryInterface,
    @Inject(TYPES.repository.SaveActivityLogDetailRepositoryInterface)
    private repoLogDetail: SaveActivityLogDetailRepositoryInterface,
  ) {
  }
  @OnEvent(EventDefinition.ACTIVITY_COMPLETED_EVENT)
  async recordActivity(event: ActivityCompletedEvent) : Promise<void> {
    let recordActivityLogDTO = new RecordActivityLogDto({
        'gamingProvider' : event.gamingProvider,
        'description': event.description,
        'activityType': event.activityType,
        'userId': event.userId,
        'browserAgent': event.browserAgent,
        'ipAddress': event.ipAddress,
    });

    const activityLog = ActivityLogs.recordActivityLog(recordActivityLogDTO);
    const log = await this.repo.saveActivityLog(activityLog);
    if(event.objectId) {
      await this.repoLogDetail.saveActivityLogDetail(
        ActivityLogDetail.recordActivityLogDetail(new RecordActivityLogDetailDto(
          {
            logId: log.id,
            objectId: event.objectId,
            objectClass: event.objectClass
          }
        ))
      );
    }
  }
}