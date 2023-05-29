import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateController } from '../../../../apps/api/user/create.controller';
import { ArpStudioCreateUserService } from './services/arpstudio/createUser.service';
import { ArpStudioUser } from './entity/createArpStudio.entity';
import { UserDetailController } from '../../../../apps/api/user/detail.controller';
import { GetUserDetailArpStudioService } from './services/arpstudio/getUserDetail.service';
import { VelaCreateUserService } from './services/vela/createUser.service';
import { VelaUser } from './entity/createVelaUser.entity';
import { UpdateController } from '../../../../apps/api/user/update.controller';
import { UpdateArpStudioUserService } from './services/arpstudio/updateUser.service';
import { GetUserDetailEvolutionService } from './services/evolution/getDetail.service';
import { EvolutionCreateUserService } from './services/evolution/createUser.service';
import { EvolutionUser } from './entity/createEvolutionUser.entity';
import { BalanceModule } from '../balance/balance.module';
import { ApiRequestService } from '../common/service/apiRequest.service';
import { CommonShareModule } from '../common/common.module';

@Module({
    imports: [TypeOrmModule.forFeature([ArpStudioUser,VelaUser,EvolutionUser]),
        forwardRef(() => BalanceModule), forwardRef(() => CommonShareModule)],
    controllers: [CreateController,UserDetailController,UpdateController],
    providers: [
        ArpStudioCreateUserService,
        GetUserDetailArpStudioService,
        VelaCreateUserService,
        UpdateArpStudioUserService,
        GetUserDetailEvolutionService,
        EvolutionCreateUserService,
    ],
    exports: [ArpStudioCreateUserService,VelaCreateUserService]

})

export class UsersModule {}
