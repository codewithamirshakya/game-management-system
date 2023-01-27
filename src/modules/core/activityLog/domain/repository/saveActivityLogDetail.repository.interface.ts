import { ActivityLogDetail } from "../entity/activityLogDetail.entity";

export interface SaveActivityLogDetailRepositoryInterface {
  saveActivityLogDetail(log: ActivityLogDetail): void;
}