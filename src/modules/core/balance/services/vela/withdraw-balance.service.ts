import { ArpStudioRequestService } from "src/modules/core/shared/application/service/arpStudio.request.service";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { DepositBalance } from "../../interface/arpStudio/arpStudioDepositBalance";
import { Inject } from "@nestjs/common";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioBalance } from "../../entity/arpStudioBalance.entity";
import { DataSource, Repository } from "typeorm";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import { ArpStudioCreateUserService } from "src/modules/core/user/services/arpstudio/createUser.service";
import { WithDrawBalance } from "../../interface/arpStudio/arpStudioWithdraw.interface";
import { DetailEvolution } from "src/modules/core/user/interface/evolutionDetail.interface";
import { VelaDepositBalanceDto } from "../../interface/vela/deposit-balance.service";
import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "src/modules/core/shared/application/dto/vela.request.dto";
import { TransIdreadyExistsException } from "../../exception/TransidAlreadyExists.exception";
import { VelaBalance } from "../../entity/vela-balance.entity";
import { VelaCreateUserService } from "src/modules/core/user/services/vela/createUser.service";

export class VelaWithdrawBalanceService {
  constructor(
    @InjectRepository(VelaBalance)
    private readonly repo: Repository<VelaBalance>,
    private dataSource: DataSource,

    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService,

    @Inject(VelaCreateUserService)
    public velaUserService: VelaCreateUserService,
  ) {
  }

  async withdrawBalance(dto: VelaDepositBalanceDto) {
    try {
      const userExits = await this.velaUserService.isUserExits(dto.member_id);
      if (!userExits) {
        throw new UserNotFoundException()
      }
      const checkTransId = await this.repo.findOne({ where: { 'trans_id': dto.transid } });
      if (checkTransId) {
        throw new TransIdreadyExistsException()

      }

      const serverResponse = await this.withdraw(dto);
      if (serverResponse && serverResponse.status_code == 0) {
        const insertData = await this.saveData(dto, serverResponse);
        const response = this.makeResponseData(insertData);
        return response;
      }


    } catch (e) {
      throw new DepositOperationFailedException(e);

    }
  }



  async withdraw(dto: VelaDepositBalanceDto) {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/withdraw-v2'
      })
    }));
  }


  async saveData(data, serverResponse) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const responseData = this.repo.create({
        username: data.member_id,
        trans_id: data.transid,
        member_id: data.member_id,
        host_id: data.host_id,
        currency: "USD",
        amount: 0,
        withdraw_balance: data.amount,
        transaction_date: serverResponse.vg_transaction_time,
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


  // async updateData(response, data) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.update(
  //       ArpStudioBalance,
  //       {
  //         id: response.id,
  //         account_type: data.atype,
  //         username: data.username,
  //       },
  //       {
  //         available_balance:response.amount - response.withdraw_balance - data.amount,
  //         withdraw_balance:response.withdraw_balance + data.amount,
  //       }
  //     );
  //     await queryRunner.commitTransaction();
  //     return true;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  makeResponseData(data) {
    return {
      username: data.username,
      account_type: data.account_type,
      amount: data.amount,
      available_balance: data.available_balance,
      withdraw_balance: data.withdraw_balance,
    }
  }

}
