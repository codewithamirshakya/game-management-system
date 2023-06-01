import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { EventDefinition } from "@src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "@src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "@src/modules/core/shared/domain/constants/activityType.constant";
import { Request } from "express";
import { SHARED_TYPES } from "@src/modules/shared/application/constants/types";
import { EventDispatcherInterface } from "@src/modules/shared/application/EventBus/eventDispatcher.interface";
import { UserUpdateFailedException } from "../../exception/userUpdateFailed.exception";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import moment from "moment";
import { ArpStudioRequestService } from "@src/modules/core/shared/application/service/arpStudio.request.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArpStudioUser } from "../../entity/createArpStudio.entity";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { UpdateUserDto } from "../../interface/arpStudioUpdateUser.interface";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
export class UpdateArpStudioUserService {
  constructor(
    @InjectRepository(ArpStudioUser)
    private usersRepository: Repository<ArpStudioUser>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
    ) {}

  @Transactional()
  async update(updateUserDTO: UpdateUserDto,req: Request,ip: string) {
    try {
      const serverResponse = await this.updateArpStudio(updateUserDTO);
      const userExits = await this.usersRepository.findOneBy({ username: updateUserDTO.username });
        const response= this.makeResponseData(userExits,serverResponse);
        return response;
      return response;
    } catch (e) {
      throw new UserUpdateFailedException('User update Failed.',e)
    }
  }

  async updateArpStudio(data: UpdateUserDto): Promise<any> {
    // const user = this.arpStudioRequestService.request(new ArpStudioRequestDto({
    //   method: 'POST',
    //   params: data,
    //   endpoint: '/user/update'
    // }));

    const user =  await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.ARP_STUDIO,
      requestDTO: new ArpStudioRequestDto({
        method: 'POST',
        params: data,
        endpoint: '/user/update'
      })
    }));

    const arpUser = await this.usersRepository.findOneBy({
      username: data.username
    });

    if(!arpUser) {
      throw new UserNotFoundException();
    }

    if(data.state === 0 || data.state === -1 || data.state === -2) {
      arpUser.state = data.state;
    }

    if(data.nickname) {
      arpUser.nickname = data.nickname;
    }
    arpUser.updated_at =  new Date();
    await this.usersRepository.save(arpUser);
    return user;
  }

  makeResponseData(data,serverResponse){
    return {
      username: data.username,
      nickname: data.nickname,
      state: data.state,

    //   openurl: serverResponse.openurl
    }
  }

}