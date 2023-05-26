// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { SaveTransactionDto } from "../../../../domain/dto/request/vela/saveTransaction.dto";
// import {
//   SaveVelaTransactionRepositoryInterface
// } from "../../../../domain/repository/velaGaming/saveVelaTransaction.repository.interface";
// import { VelaGamingTransaction } from "../../../../domain/entity/velaGamingTransaction.entity";

// @Injectable()
// export class SaveVelaTransactionRepository implements SaveVelaTransactionRepositoryInterface {
//   constructor(
//     @InjectRepository(VelaGamingTransaction) private repo: Repository<VelaGamingTransaction>,
//     ) {}

//   async save(data: SaveTransactionDto) : Promise<VelaGamingTransaction>{
//     return this.repo.save(data);
//   }
// }