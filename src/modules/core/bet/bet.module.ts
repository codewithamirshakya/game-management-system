import { Module } from '@nestjs/common';
import { GetArpstudioBetDetailService } from './services/arpstudio/detail.service';
import { BetDetailController } from '../../../../apps/api/bet/detail.controller';
import { OpmgBetDetailService } from './services/opmg/detail.service';
import { EvolutionBetDetailService } from './services/evolution/betDetail.service';

@Module({
    controllers: [BetDetailController],
    providers: [
        GetArpstudioBetDetailService,
        OpmgBetDetailService,
        EvolutionBetDetailService
    ],
})

export class BetModule {}
