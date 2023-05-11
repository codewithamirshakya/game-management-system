import { ArpStudioRequestService } from "src/modules/core/shared/application/service/arpStudio.request.service";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { Inject } from "@nestjs/common";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioBalance } from "../../entity/arpStudioBalance.entity";
import { DataSource, Repository } from "typeorm";
import { UserNotFoundException } from "../../exception/userNotFound.exception";
import { ArpStudioCreateUserService } from "src/modules/core/user/services/arpstudio/createUser.service";
import { VelaCreateUserService } from "src/modules/core/user/services/vela/createUser.service";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { VelaDepositBalanceDto } from "../../interface/vela/deposit-balance.service";
import { VelaRequestDto } from "src/modules/core/shared/application/dto/vela.request.dto";

export class VelaDepositBalanceService {
  apiRequestService: any;
  constructor(
    @InjectRepository(ArpStudioBalance)
    private readonly repo: Repository<ArpStudioBalance>,
    private dataSource: DataSource,

    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService,

      @Inject(VelaCreateUserService)
    public velaUserService: VelaCreateUserService,
    ) {
  }

  async depositBalance(dto: VelaDepositBalanceDto) {
    try {
      const userExits = await this.velaUserService.isUserExits(dto.host_id);
      if (!userExits) {
        throw new UserNotFoundException()
      }
      const data = await this.repo.findOne({ where: { 'username': dto.host_id } });
      if (!data) {
        const serverResponse = await this.deposit(dto);
        if (serverResponse) {
          const UpdateData = await this.saveData(dto);
          const response = this.makeResponseData(UpdateData);
          return response;
        }
      }
      const serverResponse = await this.deposit(dto);
      if (serverResponse) {
        const updateResponse = await this.updateData(data, dto);
        const updateResponsedata = await this.repo.findOne({ where: { 'username': dto.host_id } });
        const response = this.makeResponseData(updateResponsedata);
        return response;
      }


    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }

  async deposit(dto: VelaDepositBalanceDto){
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/deposit-v2'
      })
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
        currency:"USD",
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
      account_type: data.account_type,
      amount: data.amount,
    }
  }
}