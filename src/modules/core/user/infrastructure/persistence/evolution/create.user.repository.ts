import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../../domain/dtos/request/evolution/createUser.dto";
import {
  CreateUserRepositoryInterface
} from "../../../domain/repository/intefaces/evolution/createUser.repository.interface";
import {EvolutionUser} from "../../../domain/evolutionUser.entity";

@Injectable()
export class CreateUserRepository implements CreateUserRepositoryInterface {
  constructor(
    @InjectRepository(EvolutionUser) private usersRepository: Repository<EvolutionUser>,
    ) {}

  async create(data: CreateUserDto): Promise<EvolutionUser> {
    return this.usersRepository.save(data);
  }
}