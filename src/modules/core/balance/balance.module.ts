import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { DependenciesConstants } from "./dependencies";
import { GetController } from "../../../../apps/api/arpStudio/balance/get.controller";
import { Providers } from "./providers";
import { TransactionMain } from "./domain/entity/transactionMain.entity";
import { ArpStudioTransaction } from "./domain/entity/arpStudioTransaction.entity";
import { WithdrawController } from "../../../../apps/api/arpStudio/balance/withdraw.controller";
import { DepositController } from "../../../../apps/api/arpStudio/balance/deposit.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionMain,ArpStudioTransaction]),
        SharedModule],
    controllers: [GetController,WithdrawController,DepositController],
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class BalanceModule {}
