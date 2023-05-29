
import { Inject } from "@nestjs/common";
import { Request } from "express";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { VelaRequestDto } from "@src/modules/core/common/dto/vela.request.dto";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { VelaBalanceInterface } from "../../interface/getBalanceVela.interface";
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { InjectRepository } from "@nestjs/typeorm";
import { VelaBalance } from "../../entity/vela-balance.entity";
import { DataSource, Repository } from "typeorm";
import { VelaCreateUserService } from "@src/modules/core/user/services/vela/createUser.service";
import { UserNotFoundException } from "../../exception/userNotFound.exception";

export class GetVelaBalanceService {
  constructor(
    @InjectRepository(VelaBalance)
    private readonly repo: Repository<VelaBalance>,
    private dataSource: DataSource,

    @Inject(ApiRequestService)
     public apiRequestService: ApiRequestService,
     @Inject(VelaCreateUserService)
    public velaUserService: VelaCreateUserService,
  ) {}


  async getBalance(dto: VelaBalanceInterface,req: Request,ip: string) {
    try {
      const userExits = await this.velaUserService.isUserExits(dto.member_id);
      if (!userExits) {
        throw new UserNotFoundException()
      }
       const serverResponse = await this.getVelaGamingBalance(dto);
      if(serverResponse && serverResponse.status_code ==0){

      const queryResult = await this.repo.createQueryBuilder('vela_balance')
      .select("vela_balance.member_id")
      .addSelect('SUM(vela_balance.amount)', 'totalAmount')
      .addSelect('SUM(vela_balance.withdraw_balance)', 'withDrawBalane')
      .where("vela_balance.member_id = :member_id", { 'member_id': dto.member_id })
      .getRawOne();
        const response = this.makeResponseData(queryResult,dto.member_id);
        return response;
      }


    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getVelaGamingBalance(dto: VelaBalanceInterface){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/balance'
      })
    }));
  }

  makeResponseData(data, username) {
    return {
      username:  data.vela_balance_member_id ?  data.vela_balance_member_id :username,
      amount: data.totalAmount ?  data.totalAmount :0,
      withdraw_balance: data.withDrawBalane? data.withDrawBalane :0,
      available_balance:data ? (data.totalAmount) -(data.withDrawBalane) :0,

    }
  }
}