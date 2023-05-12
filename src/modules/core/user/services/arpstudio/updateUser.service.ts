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
export class UpdateArpStudioUserService {
  constructor(
    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    @InjectRepository(ArpStudioUser)
    private usersRepository: Repository<ArpStudioUser>,

    ) {}

  @Transactional()
  async update(updateUserDTO: UpdateUserDto,req: Request,ip: string) {
    try {
      const serverResponse = await this.updateArpStudio(updateUserDTO);
      const userExits = await this.usersRepository.findOneBy({ username: updateUserDTO.username });
      //activity completed event dispatch
      this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.ARP_STUDIO,
          ActivityTypeConstant.USER,
          "[User Updated successfully.]",
          ip,
          req.headers["user-agent"],
        ));
        const response= this.makeResponseData(userExits,serverResponse);
        return response;
      return response;
    } catch (e) {
      throw new UserUpdateFailedException('User update Failed.',e)
    }
  }

  async updateArpStudio(data: UpdateUserDto): Promise<any> {
    const user = this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: data,
      endpoint: '/user/update'
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
    console.log(arpUser);
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