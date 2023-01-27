import { ActivityLogs } from "../entity/activityLogs.entity";

export interface SaveActivityLogRepositoryInterface {
  saveActivityLog(log: ActivityLogs): Promise<ActivityLogs>;
}