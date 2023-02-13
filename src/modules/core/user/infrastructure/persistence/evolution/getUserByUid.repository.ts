import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  GetUserByUidRepositoryInterface
} from "../../../domain/repository/intefaces/evolution/getUser.repository.interface";
import {EvolutionUser} from "../../../domain/evolutionUser.entity";
import {UserNotFoundException} from "../../../domain/exception/userNotFound.exception";
import {UserDetailDto} from "../../../domain/dtos/response/evolution/userDetail.dto";

@Injectable()
export class GetUserByUidRepository implements GetUserByUidRepositoryInterface {
  constructor(
    @InjectRepository(EvolutionUser) private usersRepository: Repository<EvolutionUser>,
    ) {}

  async get(uid: string): Promise<UserDetailDto> {
    const response =  await this.usersRepository.createQueryBuilder('eu')
        .select('eu.id')
        .addSelect('mu.id')
        .leftJoin('eu.user','mu')
        .where('eu.uid = :uid',{uid})
        .getOne();
    if(!response) {
      throw new UserNotFoundException();
    }
    return new UserDetailDto({
      'id' : response.id,
      'userId' : response.user.id
    });
  }
}