import { Global, Module } from "@nestjs/common";
import { ArpStudioRequestService } from "./service/arpStudio.request.service";
import { HttpModule } from "@nestjs/axios";
import { VelaGamingRequestService } from "./service/velaGaming.request.service";
import { ApiRequestService } from "./service/apiRequest.service";
import { EvolutionRequestService } from "./service/evolution.request.service";
import { GameProviderValidation } from "./customValidator/GameProviderValidation";

@Global()
@Module({
  imports: [HttpModule],
  providers: [ArpStudioRequestService,ApiRequestService,VelaGamingRequestService,EvolutionRequestService,
    GameProviderValidation],
  exports: [ArpStudioRequestService,ApiRequestService]
})
export class CommonShareModule {}
