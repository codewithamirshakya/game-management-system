import { Module } from "@nestjs/common";


import { ArpStudioWallletBalanceService } from "./service/arpstudio/getBalance.service";
import { GetBalanceWalletController } from "../../../../apps/api/seamlessWallet/arpstudio/getBalance.controller";

@Module({
  controllers: [GetBalanceWalletController],
  providers: [ArpStudioWallletBalanceService,

  ]
})

export class SeamlessWalletModule {
}
