import { Module } from '@nestjs/common';
import { GetArpstudioBetDetailService } from './services/arpstudio/detail.service';
import { BetDetailController } from '../../../../apps/api/bet/detail.controller';
import { OpmgBetDetailService } from './services/opmg/detail.service';

@Module({
    controllers: [BetDetailController],
    providers: [
        GetArpstudioBetDetailService,
        OpmgBetDetailService
    ],
})

export class BetModule {}
