// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
// import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
// import { TransactionMain } from "../../../domain/entity/transactionMain.entity";

// @Injectable()
// export class SaveTransactionRepository implements SaveTransactionRepositoryInterface {
//   constructor(
//     @InjectRepository(TransactionMain) private repo: Repository<TransactionMain>,
//     ) {}

//   async save(data: SaveTransactionDto) : Promise<TransactionMain>{
//     return await this.repo.save(data);
//   }
// }