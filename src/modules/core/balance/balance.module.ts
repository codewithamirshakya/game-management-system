import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { CqrsModule } from "@nestjs/cqrs";
import { GetController } from "../../../../apps/api/balance/get.controller";
import { ArpStudioBalanceService } from "./services/arpStudio/getBalance.service";
import { GetVelaBalanceService } from "./services/vela/getBalance.service";
import { GetEvolutionBalanceService } from "./services/evolution/getBalance.service";
import { ArpStudioDepositService } from "./services/arpStudio/depositBalance.service";
import { DepositController } from "../../../../apps/api/balance/deposit.controller";
import { UsersModule } from "../user/users.module";
import { ArpStudioBalance } from "./entity/arpStudioBalance.entity";
import { WithdrawController } from "../../../../apps/api/balance/withdraw.controller";
import { ArpStudioWithdrawService } from "./services/arpStudio/withdraw.service";
import { VelaDepositBalanceService } from "./services/vela/deposit-balance.service";
import { VelaBalance } from "./entity/vela-balance.entity";
import { VelaWithdrawBalanceService } from "./services/vela/withdraw-balance.service";
import { EvolutionDepositBalanceService } from "./services/evolution/deposit-balance.service";
import { EvolutionWithdrawBalanceService } from "./services/evolution/withdraw.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArpStudioBalance,
      VelaBalance
    ]),
    forwardRef(() => UsersModule),
    ],
  controllers: [GetController,DepositController,WithdrawController],
  providers: [ArpStudioBalanceService,GetVelaBalanceService,
    GetEvolutionBalanceService,ArpStudioDepositService,ArpStudioWithdrawService,
    VelaDepositBalanceService,VelaWithdrawBalanceService,EvolutionDepositBalanceService,EvolutionWithdrawBalanceService
  ]
})

export class BalanceModule {
}
