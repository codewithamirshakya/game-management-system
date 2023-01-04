import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  ICreateArpStudioUserRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/createUser.repository.interface";
import { ArpStudioUser } from "../../../domain/arpStudio.user.entity";
import { CreateUserDto } from "../../../domain/dtos/request/arpStudio/create.user.dto";
import { UserDto } from "../../../domain/dtos/response/arpStudio/user.dto";

@Injectable()
export class CreateUserRepository implements ICreateArpStudioUserRepositoryInterface {
  constructor(
    @InjectRepository(ArpStudioUser) private usersRepository: Repository<ArpStudioUser>,
    ) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.save(data);
  }
}