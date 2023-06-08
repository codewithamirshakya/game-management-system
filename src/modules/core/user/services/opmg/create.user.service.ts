import { createUserArpStudio } from "../../interface/arpStudioCreateUser.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioUser } from "../../entity/createArpStudio.entity";
import { DataSource, Repository } from 'typeorm';
import { UserCreationFailedException } from "../../exception/userCreationFailed.exception";
import { UserAlreadyExistsException } from "../../exception/userAlreadyExists.exception";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { Transactional } from "typeorm-transactional";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { createUserOpmg } from "../../interface/opmgCreateUser.interface";
import { OpmgDto } from "../../../common/dto/opmg.request.dto";

export class OpmgCreateUserService {
  constructor(
    @InjectRepository(ArpStudioUser)
    private readonly repo: Repository<ArpStudioUser>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService

  ) { }

  async create(dto: createUserOpmg) {
    try {
      let serverResponse;
      // const userExits = await this.repo.findOneBy({ username: dto.username });
      // if (userExits) {
      //   throw new UserAlreadyExistsException()
      // }
      const createUserDto = {
        ...dto,
        currency: 'PHP',
        ssl: 0,

    };
      serverResponse = await this.createUserOpmg(createUserDto);
      if (serverResponse && serverResponse.success == true) {
        const insertedData = await this.saveData(dto, serverResponse);
        const response = this.makeResponseData(insertedData, serverResponse);
        return response;
      }
    } catch (e) {
      throw new UserCreationFailedException(e);
    }
  }

  async createUserOpmg(dto:createUserOpmg) {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.OPMG,
      requestDTO: new OpmgDto({
        method: 'GET',
        params: dto,
        endpoint: 'platform_create_patron'
      })
    }));
  }
  async saveData(data, serverResponse) {
    try {
      const responseData = this.repo.create({
        username: data.username,
        nickname: data.nickname,
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
    }
  }

}