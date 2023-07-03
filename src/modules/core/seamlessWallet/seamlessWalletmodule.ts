import { Module } from "@nestjs/common";


import { ArpStudioWallletBalanceService } from "./service/arpstudio/getBalance.service";
import { GetBalanceWalletController } from "../../../../apps/api/seamlessWallet/arpstudio/getBalance.controller";
import { DeductBalanceService } from "./service/arpstudio/merchantDeduct.service";
import { DeductBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/deductBalance.controller";
import { DepositBalanceService } from "./service/arpstudio/merchantDepositBalance.service";
import { DepositBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/depositBalance.controller";
import { RollbackBalanceService } from "./service/arpstudio/rollback.service";
import { RollbackBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/rollbackBalance.controller";

@Module({
  controllers: [GetBalanceWalletController, DeductBalanceController, DepositBalanceController, RollbackBalanceController],
  providers: [ArpStudioWallletBalanceService,
    DeductBalanceService,
    DepositBalanceService,
    RollbackBalanceService

  ]
})

export class SeamlessWalletModule {
}
