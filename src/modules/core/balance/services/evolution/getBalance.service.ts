
import { Inject } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";
import { Request } from 'express';
import { ApiRequestService } from '@src/modules/core/common/service/apiRequest.service';
import { ApiRequestDto } from '@src/modules/core/common/dto/apiRequest.dto';
import { EvolutionRequestDto } from '@src/modules/core/shared/application/dto/evolution.request.dto';
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { EvolutionConfig } from "@src/config/evolution.config";
import { EvolutionGetBalanceDto } from "../../interface/getBalanceEvolution.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { EvolutionBalance } from "../../entity/evolutionBalance.entity";
import { Repository } from "typeorm";
import { RetrieveOperationFailedException } from "../../exception/retreiveOperationFailed.exception";

export class GetEvolutionBalanceService {
  constructor(
    @InjectRepository(EvolutionBalance)
    private readonly repo: Repository<EvolutionBalance>,
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService
  ) {}


  @Transactional()
  async getBalance(dto: EvolutionGetBalanceDto,req: Request,ip: string) {
    try {
      const getBalanceDto = {
        cCode:  'RWA',
        ecID:EvolutionConfig.ecId,
        output:1,
        ...dto
    };
      const serverResponse = await this.getEvolutionBalance(getBalanceDto);
      const queryResult = await this.repo.createQueryBuilder('evolution_balance')
      .select("evolution_balance.username",'username')
      .addSelect('SUM(evolution_balance.amount)', 'totalAmount')
      .addSelect('SUM(evolution_balance.withdraw_balance)', 'withDrawBalane')
      .where("evolution_balance.username = :username", { 'username': dto.euID })
      .getRawOne();
      const response = this.makeResponseData(queryResult,dto.euID);
      return response;
    } catch (e) {
      throw new RetrieveOperationFailedException(e);
    }
  }

  async getEvolutionBalance(dto: any){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/api/ecashier'
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