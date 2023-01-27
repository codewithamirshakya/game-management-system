import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { TYPES } from "./application/constants/types";
import { ActivityLogDetail } from "./domain/entity/activityLogDetail.entity";
import { SaveActivityLogRepository } from "./infrastructure/persistence/saveActivityLog.repository";
import { RecordActivityLog } from "./application/eventbus/recordActivityLog";
import { ActivityLogs } from "./domain/entity/activityLogs.entity";
import { SaveActivityLogDetailRepository } from "./infrastructure/persistence/saveActivityLogDetail.repository";

const saveLog = { provide: TYPES.repository.SaveActivityLogRepositoryInterface, useClass: SaveActivityLogRepository };
const saveLogDetail = { provide: TYPES.repository.SaveActivityLogDetailRepositoryInterface, useClass: SaveActivityLogDetailRepository };

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLogs,ActivityLogDetail]),
        SharedModule],
    providers: [saveLog,saveLogDetail,RecordActivityLog],
})

export class ActivityLogModule {}

