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

export class VelaCreateUserService {
  constructor(

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService,
  ) {}

  @Transactional()
   async create(createPlayerDTO:CreateUserVela,req: Request, ip: string) {
    try {


        const response = await this.createPlayer(createPlayerDTO);
        return response;
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
}