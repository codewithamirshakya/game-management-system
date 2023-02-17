import { Module } from '@nestjs/common';
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { Controllers } from "./controllers";
import {SharedModule} from "../../shared/shared.module";

@Module({
    imports: [SharedModule],
    controllers: Controllers,
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class GameModule {}
