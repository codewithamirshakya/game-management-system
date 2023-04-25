import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { DependenciesConstants } from "./dependencies";
// import { Providers } from "./providers";
import { TransactionMain } from "./domain/entity/transactionMain.entity";
import { ArpStudioTransaction } from "./domain/entity/arpStudioTransaction.entity";
import { Controllers } from "./controllers";
import { VelaGamingTransaction } from "./domain/entity/velaGamingTransaction.entity";
import { CqrsModule } from "@nestjs/cqrs";
import {EvolutionTransaction} from "./domain/entity/evolutionTransaction.entity";
import { ArpStudioBalanceService } from "./application/services/arpStudio/getBalance.service";
import { GetVelaBalanceService } from "./application/services/vela/getBalance.service";
import { GetEvolutionBalanceService } from "./application/services/evolution/getBalance.service";
import { GetController } from "apps/api/balance/get.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionMain,
      ArpStudioTransaction,
      VelaGamingTransaction,
      EvolutionTransaction
    ]),
    SharedModule, CqrsModule],
  controllers: [GetController],
  providers: [ArpStudioBalanceService,GetVelaBalanceService,GetEvolutionBalanceService]
})

export class BalanceModule {
}
