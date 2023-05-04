// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "../../domain/user.entity";
// import { Repository } from "typeorm";
// import { UserDomain } from "../../domain/user.domain";
// import { IGetUserByIdRepositoryInterface } from "../../domain/repository/intefaces/getUserById.repository.interface";

// @Injectable()
// export class GetUserByIdRepository implements IGetUserByIdRepositoryInterface {
//   constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

//   async getById(id: number): Promise<UserDomain> {
//     return this.usersRepository.findOneBy({ id });
//   }
// }