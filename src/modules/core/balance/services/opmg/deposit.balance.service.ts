import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { Inject} from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgDepositInterface } from "../../interface/opmg/deposit.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { OpmgBalance } from "../../entity/opmg-balance.entity";
import { DataSource, Repository } from "typeorm";
import { GetBalanceExceptionFailed } from "../../exception/getbalanceOperationFailed.exception";
export class OpmgDepositService {
  constructor(
    @InjectRepository(OpmgBalance)
    private readonly repo: Repository<OpmgBalance>,
    private dataSource: DataSource,

    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService,

  ) {
  }

  async depositBalance(dto: OpmgDepositInterface) {
    try {
      // const userExits = await this.repo.findOneBy({ username: dto.patron });
      // if (!userExits) {
      //   throw new GetBalanceExceptionFailed()
      // }

      const depositDto = {
        ...dto,
        host_id: 'SiG',

      };
      const serverResponse = await this.deposit(depositDto);
      if (serverResponse && serverResponse.success == true) {
        const insertData = await this.saveData(dto);
        const response = this.makeResponseData(insertData);
        return response;
      }
      throw new DepositOperationFailedException({});

    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }

  async deposit(dto: OpmgDepositInterface): Promise<any> {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider: GameProviderConstant.OPMG,
      requestDTO: new OpmgDto({
        method: 'GET',
        params: dto,
        endpoint: 'platform_money_in'
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
        amount: data.amount,
        withdraw_balance: 0,
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
      amount: data.amount,
    }
  }
}