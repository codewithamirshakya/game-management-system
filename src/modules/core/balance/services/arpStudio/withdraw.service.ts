import { ArpStudioRequestService } from "@src/modules/core/common/service/arpStudio.request.service";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { DepositBalance } from "../../interface/arpStudio/arpStudioDepositBalance";
import { Inject} from "@nestjs/common";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioBalance } from "../../entity/arpStudioBalance.entity";
import { DataSource, Repository } from "typeorm";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import { ArpStudioCreateUserService } from "@src/modules/core/user/services/arpstudio/createUser.service";
import { WithDrawBalance } from "../../interface/arpStudio/arpStudioWithdraw.interface";
import { DetailEvolution } from "@src/modules/core/user/interface/evolutionDetail.interface";

export class ArpStudioWithdrawService {
  constructor(
    // @Inject(ArpStudioCreateUserService)
    // public arpStudioUserService: ArpStudioCreateUserService,
    @InjectRepository(ArpStudioBalance)
    private readonly repo: Repository<ArpStudioBalance>,
    private dataSource: DataSource,

    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService,

      @Inject(ArpStudioCreateUserService)
    public arpStudioUserService: ArpStudioCreateUserService,
    ) {
  }

  async withdrawBalance(dto: WithDrawBalance) {
    try {
      const userExits = await this.arpStudioUserService.isUserExits(dto.username);
      if (!userExits) {
        throw new UserNotFoundException()
      }
        const withdrawData: WithDrawBalance = {
          ...dto,
          amount: -dto.amount,
      };
        const serverResponse = await this.withdraw(withdrawData);
        if (serverResponse) {
          const insertData = await this.saveData(dto);
          const response = this.makeResponseData(insertData);
          return response;
        }

    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }

  async withdraw(dto: DepositBalance): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: dto,
      endpoint: '/user/dw'
    }));
  }

  async saveData(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const responseData = this.repo.create({
        username: data.username,
        account_type:data.atype,
        source:data.source,
        amount:0,
        withdraw_balance:data.amount,
        currency:"USD",
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

  async updateData(response, data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        ArpStudioBalance,
        {
          id: response.id,
          account_type: data.atype,
          username: data.username,
        },
        {
          available_balance:response.amount - response.withdraw_balance - data.amount,
          withdraw_balance:response.withdraw_balance + data.amount,
        }
      );
      await queryRunner.commitTransaction();
      return true;
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
      withdraw_balance: data.withdraw_balance,
    }
  }
}