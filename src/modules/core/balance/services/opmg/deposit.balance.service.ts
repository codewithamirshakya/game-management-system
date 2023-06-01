import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { Inject, forwardRef } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgDepositInterface } from "../../interface/opmg/deposit.interface";
export class OpmgDepositService {
  constructor(
    // @InjectRepository(ArpStudioBalance)
    // private readonly repo: Repository<ArpStudioBalance>,
    // private dataSource: DataSource,

    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService,

    //   @Inject(ArpStudioCreateUserService)
    // public arpStudioUserService: ArpStudioCreateUserService,
    ) {
  }

  async depositBalance(dto: OpmgDepositInterface) {
    try {
    //   const userExits = await this.arpStudioUserService.isUserExits(dto.username);
    //   if (!userExits) {
    //     throw new UserNotFoundException()
    //   }

    const depositDto = {
        ...dto,
        host_id: 'SiG',

    };
        const serverResponse = await this.deposit(depositDto);
        // if (serverResponse && serverResponse.result == 0) {
        //   const insertData = await this.saveData(dto);
        //   const response = this.makeResponseData(insertData);
        //   return response;
        // }
        return serverResponse;
        // throw new DepositOperationFailedException({});

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

//   async saveData(data) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       const responseData = this.repo.create({
//         username: data.username,
//         account_type:data.atype,
//         source:data.source,
//         amount:data.amount,
//         withdraw_balance:0,
//         currency:"USD",
//         transaction_date: new Date(),
//       });
//       await queryRunner.manager.save(responseData);
//       await queryRunner.commitTransaction();
//       return responseData;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }

//   async updateData(response, data) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       await queryRunner.manager.update(
//         ArpStudioBalance,
//         {
//           id: response.id,
//           account_type: data.atype,
//           username: data.username,
//         },
//         {
//           amount:response.amount + data.amount,
//         }
//       );
//       await queryRunner.commitTransaction();

//       return true;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }

  makeResponseData(data){
    return {
      username: data.username,
      amount: data.amount,
    }
  }
}