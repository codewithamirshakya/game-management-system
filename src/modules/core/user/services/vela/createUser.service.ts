import { Inject } from "@nestjs/common";

import { Transactional } from "typeorm-transactional";

import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Request } from "express";

import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { VelaRequestDto } from "src/modules/core/shared/application/dto/vela.request.dto";
import { CreateUserVela } from "../../interface/velaCreateUser.interface";
import { UserCreationFailedException } from "../../domain/exception/userCreationFailed.exception";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { InjectRepository } from "@nestjs/typeorm";
import { VelaUser } from "../../entity/createVelaUser.entity";
import { DataSource, Repository } from "typeorm";
import { UserAlreadyExistsException } from "../../domain/exception/userAlreadyExists.exception";

export class VelaCreateUserService {
  constructor(
    @InjectRepository(VelaUser)
    private readonly repo: Repository<VelaUser>,
    private dataSource: DataSource,
  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService,
  ) {}

  @Transactional()
   async create(createPlayerDTO:CreateUserVela,req: Request, ip: string) {
    try {
      const userExits = await this.repo.findOneBy({ member_id: createPlayerDTO.member_id });
        if(userExits){
          throw new UserAlreadyExistsException()
        }
      const serverResponse = await this.createPlayer(createPlayerDTO);
      if(serverResponse && serverResponse.status_code==0){
        const insertedData = await this.saveData(createPlayerDTO);
        const response= this.makeResponseData(insertedData,serverResponse);
        return response;
      }
    } catch (e) {
      throw new UserCreationFailedException('Player creation failed.',e)
    }
  }


  async createPlayer(dto: CreateUserVela){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/create'
      })
    }));
  }

  async saveData(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const responseData = this.repo.create({
        username: data.member_id,
        member_id:data.member_id,
        host_id:data.host_id,
        currency:data?data.currency:null

      });
      await queryRunner.manager.save(responseData);
      await queryRunner.commitTransaction();
      return responseData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  makeResponseData(data,serverResponse){
    return {
      username: data.username,
      // nickname: data.nickname,
      // openurl: serverResponse.openurl
    }
  }
}