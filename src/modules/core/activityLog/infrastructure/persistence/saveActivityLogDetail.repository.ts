import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivityLogDetail } from "../../domain/entity/activityLogDetail.entity";
import {
  SaveActivityLogDetailRepositoryInterface
} from "../../domain/repository/saveActivityLogDetail.repository.interface";


export class SaveActivityLogDetailRepository implements SaveActivityLogDetailRepositoryInterface{

  constructor(
    @InjectRepository(ActivityLogDetail) private repo: Repository<ActivityLogDetail>,
  ) {}

  async saveActivityLogDetail(log: ActivityLogDetail): Promise<void> {
    await this.repo.save(log);
  }

}