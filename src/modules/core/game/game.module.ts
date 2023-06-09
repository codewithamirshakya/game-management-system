import { Module } from '@nestjs/common';
import {SharedModule} from "../../shared/shared.module";
import { GameListController } from '../../../../apps/api/game/list.controller';
import { EvolutionListGameService } from './services/evolution/listGame.service';
import { VelaListGameService } from './services/vela/listGame.service';
import { ArpStudioListGameService } from './services/arpStudio/listGameservice';
import { OpmgGameListService } from './services/opmg/listGame.service';


@Module({
    imports: [SharedModule],
    controllers: [GameListController],
    providers: [ArpStudioListGameService,EvolutionListGameService,VelaListGameService,OpmgGameListService ],
})

export class GameModule {}
