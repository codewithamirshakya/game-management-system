// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import {EvolutionTransaction} from "../../../../domain/entity/evolutionTransaction.entity";
// import {
//   IseTransIdUniqueRepositoryInterface
// } from "../../../../domain/repository/evolution/iseTransIdUnique.repository.interface";

// @Injectable()
// export class IseTransIdUniqueRepository implements IseTransIdUniqueRepositoryInterface {
//   constructor(
//     @InjectRepository(EvolutionTransaction) private repo: Repository<EvolutionTransaction>,
//     ) {}

//   async isUnique(eTransId: string) : Promise<boolean>{
//     return  await this.repo.count({ where: {e_transaction_id: eTransId}}) <= 0;
//   }
// }