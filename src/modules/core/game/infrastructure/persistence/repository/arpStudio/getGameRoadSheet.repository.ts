// import { Inject } from "@nestjs/common";
// import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
// import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
// import {
//   GetGameRoadSheetRepositoryInterface
// } from "../../../../domain/repository/arpStudio/getGameRoadSheet.repository.interface";
// import { GetGameRoadSheetDomainDto } from "../../../../domain/dto/request/arpStudio/getGameRoadSheet.domain.dto";


// export class GetGameRoadSheetRepository implements GetGameRoadSheetRepositoryInterface{
//   @Inject(ArpStudioRequestService)
//   public arpStudioRequestService: ArpStudioRequestService

//   get(dto: GetGameRoadSheetDomainDto): Promise<any> {
//     return this.arpStudioRequestService.request(new ArpStudioRequestDto({
//       method: 'GET',
//       params: dto,
//       endpoint: '/client/game/roadsheet'
//     }));
//   }
// }