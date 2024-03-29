import { Module } from '@nestjs/common';
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { DetailController } from "../../../../apps/api/arpStudio/account/detail.controller";

@Module({
    controllers: [DetailController],
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class AccountModule {}
