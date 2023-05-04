// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "../../domain/user.entity";
// import { Repository } from "typeorm";
// import { IGetUserRepositoryInterface } from "../../domain/repository/intefaces/getUser.repository.interface";
// import { UserNotFoundException } from "../../domain/exception/userNotFound.exception";

// @Injectable()
// export class GetUserByUsernameAndGameProviderRepository implements IGetUserRepositoryInterface {
//   constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

//   async getByUserNameAndGameProvider(username: string, gameProvider: number): Promise<User> {
//     const user = await this.usersRepository.createQueryBuilder('u')
//       .select('u.id')
//       .where("u.username = :username",{username: username})
//       .andWhere("u.gameProvider = :gameProvider",{gameProvider: gameProvider})
//       .getOne();

//     if(!user){
//       throw new UserNotFoundException();
//     }
//     return user;
//   }
// }
