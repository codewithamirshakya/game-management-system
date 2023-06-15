import { Module } from '@nestjs/common';
import { GetArpstudioBetDetailService } from './services/arpstudio/detail.service';
import { BetDetailController } from '../../../../apps/api/bet/detail.controller';

@Module({
    controllers: [BetDetailController],
    providers: [
        GetArpstudioBetDetailService
    ],
})

export class BetModule {}
