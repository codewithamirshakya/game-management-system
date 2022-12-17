import { Injectable } from "@nestjs/common";
import { IGetARPUserRepositoryInterface } from "../../../domain/repository/arpSlot/getARPUser.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../domain/user.entity";
import { Repository } from "typeorm";
import { UserDomain } from "../../../domain/user.domain";

@Injectable()
export class GetUserByIdRepository implements IGetARPUserRepositoryInterface {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getById(id: string): Promise<UserDomain> {
    // @ts-ignore
    return this.usersRepository.findOne({ userId: id });
  }
}