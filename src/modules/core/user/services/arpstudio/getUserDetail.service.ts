import { Inject } from "@nestjs/common";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { EventDefinition } from "@src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "@src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "@src/modules/core/shared/domain/constants/activityType.constant";
import { Request } from "express";
import { DetailUserDto } from "../../dtos/arpStudio/detail.user.dto";
import { ArpStudioRequestService } from "@src/modules/core/shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { SHARED_TYPES } from "@src/modules/shared/application/constants/types";
import { EventDispatcherInterface } from "@src/modules/shared/application/EventBus/eventDispatcher.interface";
import { UserFetchFailedException } from "../../exception/userFetchFailed.exception";
import { ArpStudioUser } from "../../entity/createArpStudio.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
export class GetUserDetailArpStudioService {
    constructor(
      @InjectRepository(ArpStudioUser)
      private readonly repo: Repository<ArpStudioUser>,
      @Inject(ApiRequestService)
      public apiRequestService: ApiRequestService
      ) {}

    async getDetail(dto: DetailUserDto,req: Request,ip: string) {
        try {
            const serverResponse = await this.getUserDetail(dto);
            // return serverResponse;

            if (serverResponse && serverResponse.result == 0) {
              const userData = await this.repo.findOneBy({ username: dto.username });
              const response = this.makeResponseData(userData);
              return response;
            }

        } catch (e) {
          console.log('test111',e)
            throw new UserFetchFailedException(e);
        }
    }

    async getUserDetail(data: DetailUserDto): Promise<any> {
      // return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      //   method: 'GET',
      //   params: data,
      //   endpoint: 'user/info'
      // }));

      return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider: GameProviderConstant.ARP_STUDIO,
        requestDTO: new ArpStudioRequestDto({
          method: 'GET',
          params: data,
          endpoint: 'user/info'
        })
      }));
    }
    makeResponseData(data) {
      return {
        username: data.username,
        // openurl: serverResponse.openurl
      }
    }
}