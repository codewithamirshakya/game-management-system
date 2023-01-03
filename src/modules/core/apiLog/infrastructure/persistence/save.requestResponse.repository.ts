import {
  SaveRequestResponseRepositoryInterface
} from "../../domain/repository/save.requestResponse.repository.interface";
import { SaveApiLogDto } from "../../domain/dto/saveApiLog.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiLog } from "../../domain/apiLog.entity";

export class SaveRequestResponseRepository implements SaveRequestResponseRepositoryInterface{
  constructor(
    @InjectRepository(ApiLog) private repo: Repository<ApiLog>,
  ) {}

  async save(dto: SaveApiLogDto) {
    return this.repo.save(dto);
  }

}