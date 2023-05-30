import {Inject} from "@nestjs/common";
import {Transactional} from "typeorm-transactional";
import {Request} from "express";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { EvolutionDepositBalance } from "../../interface/evolution/deposit-balance.interface";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { EvolutionTransactionFailedException } from "../../exception/evolutionTransactionFailed.exception";
import { EvolutionConfig } from "@src/config/evolution.config";
import { InjectRepository } from "@nestjs/typeorm";
import { EvolutionBalance } from "../../entity/evolutionBalance.entity";
import { DataSource, Repository } from "typeorm";

export class EvolutionDepositBalanceService {
    constructor(
        @InjectRepository(EvolutionBalance)
        private readonly repo: Repository<EvolutionBalance>,
        private dataSource: DataSource,

        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService
    ) {
    }

     async depositBalance(dto: EvolutionDepositBalance, req: Request, ip: string) {
        try {
            const depositRequestDto = {
                cCode:  'ECR',
                ecID:EvolutionConfig.ecId,
                ...dto
            };
            const serverResponse = await this.request(depositRequestDto);
            if(serverResponse.transfer.result._text === 'N') {
                throw new EvolutionTransactionFailedException(serverResponse);
            }
            const insertData = await this.saveData(dto);
            const response = this.makeResponseData(insertData);
            return response;

        } catch (e) {
            throw new DepositOperationFailedException(e);
        }
    }

    async request(dto: any){
      return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.EVOLUTION,
        requestDTO: new EvolutionRequestDto({
          method: 'GET',
          params: dto,
          endpoint: '/api/ecashier'
        })
      }));
    }

    async saveData(data) {
        console.log(data)
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const responseData = this.repo.create({
            username: data.euID,
            trans_id:data.eTransID,
            amount:data.amount,
            withdraw_balance:0,
            transaction_date: new Date(),
          });
          await queryRunner.manager.save(responseData);
          await queryRunner.commitTransaction();
          return responseData;
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          await queryRunner.release();
        }
      }

    makeResponseData(data){
        return {
          username: data.username,
          amount: data.amount,
        }
      }
}