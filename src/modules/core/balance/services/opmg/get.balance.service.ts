
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { Request } from 'express';
import { ApiRequestService } from '@src/modules/core/common/service/apiRequest.service';
import { ApiRequestDto } from '@src/modules/core/common/dto/apiRequest.dto';
import { EvolutionRequestDto } from '@src/modules/core/shared/application/dto/evolution.request.dto';
import { RetrieveOperationFailedException } from "../../domain/exception/retreiveOperationFailed.exception";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { EvolutionConfig } from "@src/config/evolution.config";
import { EvolutionGetBalanceDto } from "../../interface/getBalanceEvolution.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { EvolutionBalance } from "../../entity/evolutionBalance.entity";
import { Repository } from "typeorm";
import { getBalanceOpmg } from "../../interface/opmg/getbalance.interface";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";

export class GetOpmgBalanceService {
  constructor(
    // @InjectRepository(EvolutionBalance)
    // private readonly repo: Repository<EvolutionBalance>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) {}


  @Transactional()
  async getBalance(dto: getBalanceOpmg) {
    try {
      const getBalanceDto = {
        ...dto,
        host_id: 'SiG',
    };
      const serverResponse = await this.getOpmgBalance(getBalanceDto);
    //   const queryResult = await this.repo.createQueryBuilder('evolution_balance')
    //   .select("evolution_balance.username",'username')
    //   .addSelect('SUM(evolution_balance.amount)', 'totalAmount')
    //   .addSelect('SUM(evolution_balance.withdraw_balance)', 'withDrawBalane')
    //   .where("evolution_balance.username = :username", { 'username': dto.euID })
    //   .getRawOne();
    //   const response = this.makeResponseData(queryResult,dto.euID);
      return serverResponse;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getOpmgBalance(dto: getBalanceOpmg){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider: GameProviderConstant.OPMG,
        requestDTO: new OpmgDto({
          method: 'GET',
          params: dto,
          endpoint: 'platform_balance'
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