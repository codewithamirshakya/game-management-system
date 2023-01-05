import { LoginArpStudioDto } from "../../../domain/dto/request/login.arpStudio.dto";
import { ArpStudioRequestService } from "../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../shared/application/dto/arpStudio.request.dto";
import { Inject } from "@nestjs/common";
import { LogoutRepositoryInterface } from "../../../domain/repository/logout.repository.interface";

export class LogoutRepository implements LogoutRepositoryInterface{

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  arpStudioLogout(dto: LoginArpStudioDto) {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: dto,
      endpoint: '/kickout'
    }));
  }

}