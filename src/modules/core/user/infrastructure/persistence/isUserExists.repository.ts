import { IsUserExistsRepositoryInterface } from "../../domain/repository/intefaces/isUserExists.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/user.entity";
import { Repository } from "typeorm";

export class IsUserExistsRepository implements IsUserExistsRepositoryInterface{
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async isUserExists(username: string, gameProvider: number) : Promise<Boolean> {
    return await this.usersRepository.createQueryBuilder('u')
      .where("u.username = :username",{username: username})
      .andWhere("u.gameProvider = :gameProvider",{gameProvider: gameProvider})
      .getCount() > 0;
  }

}