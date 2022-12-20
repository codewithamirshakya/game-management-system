import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/user.entity";
import { Repository } from "typeorm";
import { UserDomain } from "../../domain/user.domain";
import { IGetUserRepositoryInterface } from "../../domain/repository/intefaces/getUser.repository.interface";

@Injectable()
export class GetUserByIdRepository implements IGetUserRepositoryInterface {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getById(userId: string): Promise<UserDomain> {
    return this.usersRepository.findOneBy({ userId });
  }
}