import { Global, Module } from "@nestjs/common";
import { ArpStudioRequestService } from "./application/service/arpStudio.request.service";
import { HttpModule } from "@nestjs/axios";
import { VelaGamingRequestService } from "./application/service/velaGaming.request.service";
import { ApiRequestService } from "./application/service/apiRequest.service";
import { EvolutionRequestService } from "./application/service/evolution.request.service";

@Global()
@Module({
  imports: [HttpModule],
  providers: [ArpStudioRequestService,ApiRequestService,VelaGamingRequestService,EvolutionRequestService],
  exports: [ArpStudioRequestService,ApiRequestService]
})
export class CoreSharedModule {}
