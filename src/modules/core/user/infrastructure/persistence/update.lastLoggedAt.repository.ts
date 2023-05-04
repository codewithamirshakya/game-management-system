// import {
//   UpdateLastLoggedAtRepositoryInterface
// } from "../../domain/repository/intefaces/update.lastLoggedAt.repository.interface";
// import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "../../domain/user.entity";
// import { Repository } from "typeorm";
// import { UserNotFoundException } from "../../domain/exception/userNotFound.exception";
// import * as moment from "moment";

// export class UpdateLastLoggedAtRepository implements UpdateLastLoggedAtRepositoryInterface{

//   constructor(
//     @InjectRepository(User) private usersRepository: Repository<User>,
//   ) {}

//   async update(username: string, gameProvider: number){
//     const user : User = await this.usersRepository.findOneBy({
//       username,gameProvider
//     });
//     if(!user) {
//       throw new UserNotFoundException();
//     }
//     const now = moment().format('YYYY-MM-DD HH:mm:ss');
//     return await this.usersRepository.createQueryBuilder('u')
//       .update(User)
//       .set({lastLoggedAt: now, updatedAt: now})
//       .where("username = :username",{username: username})
//       .andWhere("gameProvider = :gameProvider",{gameProvider: gameProvider})
//       .execute();
//   }

// }