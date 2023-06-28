import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgDepositInterface } from "../../interface/opmg/deposit.interface";
import { OpmgBalance } from "../../entity/opmg-balance.entity";

export class OpmgWithdrawBalanceService {
  constructor(
    @InjectRepository(OpmgBalance)
    private readonly repo: Repository<OpmgBalance>,
    private dataSource: DataSource,

    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService,

  ) {
  }

  async withdrawBalance(dto: OpmgDepositInterface) {
    try {
    //   const userExits = await this.velaUserService.isUserExits(dto.member_id);
    //   if (!userExits) {
    //     throw new UserNotFoundException()
    //   }
    //   const checkTransId = await this.repo.findOne({ where: { 'trans_id': dto.transid } });
    //   if (checkTransId) {
    //     throw new TransIdreadyExistsException()

    //   }

    const withDrawDto = {
        ...dto,
        host_id: 'SiG',

    };

      const serverResponse = await this.withdraw(withDrawDto);
      if (serverResponse && serverResponse.success == true) {
        const insertData = await this.saveData(dto);
        const response = this.makeResponseData(insertData);
        return response;
      }
    return serverResponse;



    } catch (e) {
      throw new DepositOperationFailedException(e);

    }
  }

  async withdraw(dto: OpmgDepositInterface) {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider: GameProviderConstant.OPMG,
        requestDTO: new OpmgDto({
          method: 'GET',
          params: dto,
          endpoint: 'platform_money_out'
        })
      }));
  }


  async saveData(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const responseData = this.repo.create({
        username: data.patron,
        amount:0 ,
        withdraw_balance: data.amount,
        trans_id: data.id,
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

  makeResponseData(data) {
    return {
      username: data.username,
      withdraw_balance: data.withdraw_balance,
    }
  }

}
