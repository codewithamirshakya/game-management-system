import { Module } from "@nestjs/common";


import { ArpStudioWallletBalanceService } from "./service/arpstudio/getBalance.service";
import { GetBalanceWalletController } from "../../../../apps/api/seamlessWallet/arpstudio/getBalance.controller";
import { DeductBalanceService } from "./service/arpstudio/merchantDeduct.service";
import { DeductBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/deductBalance.controller";
import { DepositBalanceService } from "./service/arpstudio/merchantDepositBalance.service";
import { DepositBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/depositBalance.controller";
import { RollbackBalanceService } from "./service/arpstudio/rollback.service";
import { RollbackBalanceController } from "../../../../apps/api/seamlessWallet/arpstudio/rollbackBalance.controller";
import { EvoutionWalletBalanceService } from "./service/evolution/getBalance.service";
import { EvoutionGetBalanceController } from "../../../../apps/api/seamlessWallet/evolution/getBalance.controller";
import { EvoutionDepositBalanceService } from "./service/evolution/depositBalance.service";
import { DepositEvolutionBalanceController } from "../../../../apps/api/seamlessWallet/evolution/deposit.controller";
import { EvoutionDeductBalanceService } from "./service/evolution/deductBalance.service";
import { EvoutionCancelBalanceService } from "./service/evolution/cancelBalance.service";
import { DeductEvolutionBalanceController } from "../../../../apps/api/seamlessWallet/evolution/deduct.controller";
import { CancelEvoutionBalanceController } from "../../../../apps/api/seamlessWallet/evolution/cancel.controller";
import { CheckUserService } from "./service/evolution/checkUser.service";
import { CheckUserController } from "../../../../apps/api/seamlessWallet/evolution/checkUser.controller";
import { PromoPayoutService } from "./service/evolution/promoPayout.service";
import { PromoPayoutController } from "../../../../apps/api/seamlessWallet/evolution/promoPayout.controller";

@Module({
  controllers: [GetBalanceWalletController, DeductBalanceController,
    DepositBalanceController, RollbackBalanceController,CheckUserController,
    EvoutionGetBalanceController, DepositEvolutionBalanceController, DeductEvolutionBalanceController, 
    CancelEvoutionBalanceController,PromoPayoutController ],
  providers: [ArpStudioWallletBalanceService,
    CheckUserService,
    DeductBalanceService,
    DepositBalanceService,
    RollbackBalanceService,
    EvoutionWalletBalanceService,
    EvoutionDepositBalanceService,
    EvoutionDeductBalanceService,
    EvoutionCancelBalanceService,
    PromoPayoutService

  ]
})

export class SeamlessWalletModule {
}
