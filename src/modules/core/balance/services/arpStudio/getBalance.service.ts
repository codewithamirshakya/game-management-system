
import { Inject } from "@nestjs/common";
import { Request } from "express";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { EventDefinition } from "@src/modules/core/shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "@src/modules/core/shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "@src/modules/core/shared/domain/constants/activityType.constant";
import { ArpStudioGetBalance } from "../../interface/arpStudio.interface";
import { SHARED_TYPES } from "@src/modules/shared/application/constants/types";
import { EventDispatcherInterface } from "@src/modules/shared/application/EventBus/eventDispatcher.interface";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import { ArpStudioCreateUserService } from "@src/modules/core/user/services/arpstudio/createUser.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioBalance } from "../../entity/arpStudioBalance.entity";
import { DataSource, Repository } from "typeorm";
import { EvolutionTransactionFailedException } from "../../exception/evolutionTransactionFailed.exception";
import { WithDrawExceptionFailed } from "../../exception/withdrawFailedException";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { RetrieveOperationFailedException } from "../../exception/retreiveOperationFailed.exception";

export class ArpStudioBalanceService {
  constructor(
    @InjectRepository(ArpStudioBalance)
    private readonly repo: Repository<ArpStudioBalance>,
    @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    @Inject(ArpStudioCreateUserService)
    public arpStudioUserService: ArpStudioCreateUserService,

  ) {}


  async getBalance(dto: ArpStudioGetBalance,req: Request,ip: string) {
    try {
      const userExits = await this.arpStudioUserService.isUserExits(dto.username);
      if (!userExits) {
        throw new UserNotFoundException()
      }
      const serverResponse = await this.getBalanceArpStudio(dto);
      const queryResult = await this.repo.createQueryBuilder('arp_studio_balance')
      .select("arp_studio_balance.username",'username')
      .addSelect('SUM(arp_studio_balance.amount)', 'totalAmount')
      .addSelect('SUM(arp_studio_balance.withdraw_balance)', 'withDrawBalane')
      .where("arp_studio_balance.username = :username", { 'username': dto.username })
      .getRawOne();

      if(serverResponse &&  serverResponse.result==0){
        const response = this.makeResponseData(queryResult,dto.username);
        return response;
      }else{
        throw new WithDrawExceptionFailed()

      }
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getBalanceArpStudio(dto: ArpStudioGetBalance){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.ARP_STUDIO,
      requestDTO: new ArpStudioRequestDto({
        method: 'GET',
        params: dto,
        endpoint: 'user/balance'
      })
    }));
  }

  makeResponseData(data,username) {
    return {
      username: data.username ? data.username :username,
      amount: data.totalAmount ?data.totalAmount:0 ,
      withdraw_balance: data.withDrawBalane ? data.withDrawBalane:0,
      available_balance: (data.totalAmount) -(data.withDrawBalane),

    }
  }
}