import { Module } from '@nestjs/common';
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { Controllers } from "./controllers";

@Module({
    controllers: Controllers,
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class GameModule {}
