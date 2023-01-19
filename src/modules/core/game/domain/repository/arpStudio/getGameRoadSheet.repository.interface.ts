import { GetGameRoadSheetDomainDto } from "../../dto/request/arpStudio/getGameRoadSheet.domain.dto";

export interface GetGameRoadSheetRepositoryInterface {
  get(dto:GetGameRoadSheetDomainDto);
}