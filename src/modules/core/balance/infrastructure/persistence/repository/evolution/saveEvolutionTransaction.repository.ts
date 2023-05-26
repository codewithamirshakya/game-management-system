// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { SaveTransactionDto } from "../../../../domain/dto/request/evolution/saveTransaction.dto";
// import {
//   SaveEvolutionTransactionRepositoryInterface
// } from "../../../../domain/repository/evolution/saveEvolutionTransaction.repository.interface";
// import {EvolutionTransaction} from "../../../../domain/entity/evolutionTransaction.entity";

// @Injectable()
// export class SaveEvolutionTransactionRepository implements SaveEvolutionTransactionRepositoryInterface {
//   constructor(
//     @InjectRepository(EvolutionTransaction) private repo: Repository<EvolutionTransaction>,
//     ) {}

//   async save(data: SaveTransactionDto) : Promise<EvolutionTransaction>{
//     return this.repo.save(data);
//   }
// }