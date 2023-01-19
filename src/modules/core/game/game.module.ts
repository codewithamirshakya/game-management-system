import { Module } from '@nestjs/common';
import { DependenciesConstants } from "./dependencies";
import { Providers } from "./providers";
import { ListController } from "../../../../apps/api/arpStudio/game/lobby/list.controller";
import { GetController } from "../../../../apps/api/arpStudio/game/roadsheet/get.controller";

@Module({
    controllers: [ListController,GetController],
    providers: [
          ...DependenciesConstants,
          ...Providers
    ],
})

export class GameModule {}
