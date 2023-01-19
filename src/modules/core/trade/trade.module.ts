import { Module } from '@nestjs/common';
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { DetailController } from "../../../../apps/api/arpStudio/trade/detail.controller";

@Module({
    // imports: [SharedModule],
    controllers: [DetailController],
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class TradeModule {}
