import { Global, Module, forwardRef } from "@nestjs/common";
import { ArpStudioRequestService } from "./service/arpStudio.request.service";
import { HttpModule } from "@nestjs/axios";
import { VelaGamingRequestService } from "./service/velaGaming.request.service";
import { ApiRequestService } from "./service/apiRequest.service";
import { EvolutionRequestService } from "./service/evolution.request.service";
import { GameProviderValidation } from "./customValidator/GameProviderValidation";
import { UsersModule } from "../user/users.module";
import { OpmgRequestService } from "./service/opmg.request.service";

@Global()
@Module({
  imports: [HttpModule,forwardRef(() => UsersModule)],
  providers: [ArpStudioRequestService,
    ApiRequestService,
    VelaGamingRequestService,
    EvolutionRequestService,
    OpmgRequestService,
    GameProviderValidation],
  exports: [ArpStudioRequestService,ApiRequestService]
})
export class CommonShareModule {}
