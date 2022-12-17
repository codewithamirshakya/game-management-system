import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../domain/user.entity";
import { Repository } from "typeorm";
import { UserDomain } from "../../../domain/user.domain";
import { ICreateUserRepositoryInterface } from "../../../domain/repository/intefaces/createUser.repository.interface";
import { CreateUserDto } from "../../../domain/dtos/request/create.user.dto";

@Injectable()
export class CreateUserRepository implements ICreateUserRepositoryInterface {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(data: CreateUserDto): Promise<UserDomain> {
    return this.usersRepository.save(data);
  }
}