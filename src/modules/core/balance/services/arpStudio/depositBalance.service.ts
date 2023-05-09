import { ArpStudioRequestService } from "src/modules/core/shared/application/service/arpStudio.request.service";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { DepositBalance } from "../../interface/arpStudio/arpStudioDepositBalance";
import { Inject } from "@nestjs/common";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";

export class ArpStudioDepositService {
  constructor(
    // @Inject(TYPES.repository.DepositBalanceRepositoryInterface) private repo: DepositBalanceRepositoryInterface,
    // @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    // @Inject(TYPES.repository.SaveArpTransactionRepositoryInterface) private saveArpTransactionRepo: SaveArpTransactionRepositoryInterface,
    @Inject(ArpStudioRequestService)
    public arpStudioRequestService: ArpStudioRequestService
    ) {
  }

  async depositBalance(dto: DepositBalance) {
    // validation
    try {
      console.log(dto);
      const response = await this.deposit(dto);

      // await this.saveArpTransactionRepo.save(new SaveArpTransactionDto({
      //   main_transaction_id: mainTransaction.id,
      //   account_type: response.atype,
      //   trade_no: dto.tradeno,
      //   source: dto.source
      // }));


      return response;
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
}