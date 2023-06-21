import { Module } from '@nestjs/common';
import { GetArpstudioBetDetailService } from './services/arpstudio/detail.service';
import { BetDetailController } from '../../../../apps/api/bet/detail.controller';
import { OpmgBetDetailService } from './services/opmg/detail.service';
import { EvolutionBetDetailService } from './services/evolution/betDetail.service';
import { VelaBetDetailService } from './services/vela/detail.service';

@Module({
    controllers: [BetDetailController],
    providers: [
        GetArpstudioBetDetailService,
        OpmgBetDetailService,
        EvolutionBetDetailService,
        VelaBetDetailService
    ],
})

export class BetModule {}
