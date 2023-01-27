import { SaveActivityLogRepositoryInterface } from "../../domain/repository/saveActivityLog.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivityLogs } from "../../domain/entity/activityLogs.entity";

export class SaveActivityLogRepository implements SaveActivityLogRepositoryInterface{

  constructor(
    @InjectRepository(ActivityLogs) private repo: Repository<ActivityLogs>,
  ) {}

  async saveActivityLog(log: ActivityLogs): Promise<ActivityLogs> {
    return await this.repo.save(log);
  }

}