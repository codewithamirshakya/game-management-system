import { ArpStudioRequestService } from "@src/modules/core/shared/application/service/arpStudio.request.service";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { DepositBalance } from "../../interface/arpStudio/arpStudioDepositBalance";
import { Inject, forwardRef } from "@nestjs/common";
import { ArpStudioRequestDto } from "@src/modules/core/shared/application/dto/arpStudio.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioBalance } from "../../entity/arpStudioBalance.entity";
import { DataSource, Repository } from "typeorm";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import { ArpStudioCreateUserService } from "@src/modules/core/user/services/arpstudio/createUser.service";
import{toDate} from "../../../../../lib/utils/cast.utils"
export class ArpStudioDepositService {
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

  async depositBalance(dto: DepositBalance) {
    try {
      const userExits = await this.arpStudioUserService.isUserExits(dto.username);
      if (!userExits) {
        throw new UserNotFoundException()
      }
        const serverResponse = await this.deposit(dto);
        if (serverResponse && serverResponse.result == 0) {
          const UpdateData = await this.saveData(dto);
          const response = this.makeResponseData(UpdateData);
          return response;
        }
    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }

  async deposit(dto: DepositBalance): Promise<any> {
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
        amount:data.amount,
        withdraw_balance:0,
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
          amount:response.amount + data.amount,
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
      amount: data.amount,
    }
  }
}