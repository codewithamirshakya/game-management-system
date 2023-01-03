import { Global, Module } from "@nestjs/common";
import { ArpStudioRequestService } from "./application/service/arpStudio.request.service";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [HttpModule],
  providers: [ArpStudioRequestService],
  exports: [ArpStudioRequestService]
})
export class CoreSharedModule {}
