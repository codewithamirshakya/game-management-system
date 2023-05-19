import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { createUserArpStudio } from "../../interface/arpStudioCreateUser.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioUser } from "../../entity/createArpStudio.entity";
import { DataSource, Repository } from 'typeorm';
import { UserCreationFailedException } from "../../exception/userCreationFailed.exception";
import { UserAlreadyExistsException } from "../../exception/userAlreadyExists.exception";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { Transactional } from "typeorm-transactional";
// import { GameProviderConstant } from "../../../shared/application/constants/gameProvider.constant";

export class ArpStudioCreateUserService {
  constructor(
    @InjectRepository(ArpStudioUser)
    private readonly repo: Repository<ArpStudioUser>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService

  ) { }

  async create(dto: createUserArpStudio) {
    try {
      let serverResponse;
      const userExits = await this.repo.findOneBy({ username: dto.username });
      if (userExits) {
        throw new UserAlreadyExistsException()
      }
      serverResponse = await this.createUserArpStudio(dto);
      if (serverResponse && serverResponse.result == 0) {
        const insertedData = await this.saveData(dto, serverResponse);
        const response = this.makeResponseData(insertedData, serverResponse);
        return response;
      }
    } catch (e) {
      throw new UserCreationFailedException(e);
    }
  }

  async createUserArpStudio(dto: createUserArpStudio) {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.ARP_STUDIO,
      requestDTO: new ArpStudioRequestDto({
        method: 'POST',
        params: dto,
        endpoint: 'login'
      })
    }));
  }
  @Transactional()
  async saveData(data, serverResponse) {
    try {
      const responseData = this.repo.create({
        username: data.username,
        nickname: data.nickname,
        open_url: serverResponse.openurl,
      });
      await this.repo.save(responseData);
      return responseData;
    } catch (error) {
      throw new UserCreationFailedException(error);
    }
  }
  async isUserExits(username: string): Promise<any> {
    const result = await this.repo.findOne({
      where: {
        username: username,
      },
    });
    return result ? true : false;
  }

  makeResponseData(data, serverResponse) {
    return {
      username: data.username,
      nickname: data.nickname,
      state: data.state,
      // openurl: serverResponse.openurl
    }
  }

}