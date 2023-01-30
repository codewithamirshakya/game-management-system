import { Module } from "@nestjs/common";
import { SharedModule } from "../../shared/shared.module";
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { Controllers } from "./controllers";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    SharedModule, CqrsModule],
  controllers: Controllers,
  providers: [
    ...DependenciesConstants,
    ...Providers
  ]
})

export class WalletModule {}
