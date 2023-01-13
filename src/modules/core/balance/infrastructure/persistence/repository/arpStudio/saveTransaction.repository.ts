import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  SaveTransactionRepositoryInterface
} from "../../../../domain/repository/arpStudio/saveTransaction.repository.interface";
import { ArpStudioTransaction } from "../../../../domain/entity/arpStudioTransaction.entity";
import { SaveTransactionDto } from "../../../../domain/dto/request/arpStudio/saveTransaction.dto";

@Injectable()
export class SaveTransactionRepository implements SaveTransactionRepositoryInterface {
  constructor(
    @InjectRepository(ArpStudioTransaction) private repo: Repository<ArpStudioTransaction>,
    ) {}

  async save(data: SaveTransactionDto) : Promise<ArpStudioTransaction>{
    return this.repo.save(data);
  }
}