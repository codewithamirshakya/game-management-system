import { Module } from '@nestjs/common';
import {SharedModule} from "../../shared/shared.module";
import { GameListController } from '../../../../apps/api/game/list.controller';
import { ArpStudioListGameLobbyService } from './application/services/arpStudio/listGameLobby.service';
import { EvolutionListGameService } from './application/services/evolution/listGame.service';
import { VelaListGameService } from './application/services/vela/listGame.service';


@Module({
    imports: [SharedModule],
    controllers: [GameListController],
    providers: [ArpStudioListGameLobbyService,EvolutionListGameService,VelaListGameService ],
})

export class GameModule {}
