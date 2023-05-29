import { Inject } from "@nestjs/common";

import { Transactional } from "typeorm-transactional";

import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Request } from "express";

import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { VelaRequestDto } from "@src/modules/core/shared/application/dto/vela.request.dto";
import { CreateUserVela } from "../../interface/velaCreateUser.interface";
import { UserCreationFailedException } from "../../exception/userCreationFailed.exception";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { InjectRepository } from "@nestjs/typeorm";
import { VelaUser } from "../../entity/createVelaUser.entity";
import { DataSource, Repository } from "typeorm";
import { UserAlreadyExistsException } from "../../exception/userAlreadyExists.exception";

export class VelaCreateUserService {
  constructor(
    @InjectRepository(VelaUser)
    private readonly repo: Repository<VelaUser>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) {}

  // @Transactional()
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
      throw new UserCreationFailedException(e)
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

    try {
      const responseData = this.repo.create({
        username: data.member_id,
        member_id:data.member_id,
        host_id:data.host_id,
        currency:data?data.currency:null

      });
      await this.repo.save(responseData);
      return responseData;
    } catch (error) {
      throw error;
    } finally {
    }
  }

  makeResponseData(data,serverResponse){
    return {
      username: data.username,
    }
  }

  async isUserExits(memberId: string): Promise<any> {
    const result = await this.repo.findOne({
      where: {
        member_id: memberId,
      },
    });
    return result ? true : false;
  }

}