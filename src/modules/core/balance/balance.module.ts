import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
// import { DependenciesConstants } from "./dependencies";
// import { Providers } from "./providers";
import { TransactionMain } from "./domain/entity/transactionMain.entity";
import { ArpStudioTransaction } from "./domain/entity/arpStudioTransaction.entity";
// import { Controllers } from "./controllers";
import { VelaGamingTransaction } from "./domain/entity/velaGamingTransaction.entity";
import { CqrsModule } from "@nestjs/cqrs";
import {EvolutionTransaction} from "./domain/entity/evolutionTransaction.entity";
// import { ArpStudioBalanceService } from "./application/services/arpStudio/getBalance.service";
// import { GetVelaBalanceService } from "./application/services/vela/getBalance.service";
// import { GetEvolutionBalanceService } from "./application/services/evolution/getBalance.service";
import { GetController } from "apps/api/balance/get.controller";
import { ArpStudioBalanceService } from "./services/arpStudio/getBalance.service";
import { GetVelaBalanceService } from "./services/vela/getBalance.service";
import { GetEvolutionBalanceService } from "./services/evolution/getBalance.service";
import { ArpStudioDepositService } from "./services/arpStudio/depositBalance.service";
import { DepositController } from "apps/api/balance/deposit.controller";
import { UsersModule } from "../user/users.module";
import { ArpStudioBalance } from "./entity/arpStudioBalance.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArpStudioBalance,
      ArpStudioTransaction,
      VelaGamingTransaction,
      EvolutionTransaction
    ]),
    forwardRef(() => UsersModule),
    SharedModule, CqrsModule],
  controllers: [GetController,DepositController,],
  providers: [ArpStudioBalanceService,GetVelaBalanceService,GetEvolutionBalanceService,ArpStudioDepositService]
})

export class BalanceModule {
}
