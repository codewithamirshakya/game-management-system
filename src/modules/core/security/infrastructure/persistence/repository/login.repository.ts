import { LoginRepositoryInterface } from "../../../domain/repository/login.repository.interface";
import { LoginArpStudioDto } from "../../../domain/dto/request/login.arpStudio.dto";
import { ArpStudioRequestService } from "../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../shared/application/dto/arpStudio.request.dto";
import { Inject } from "@nestjs/common";

export class LoginRepository implements LoginRepositoryInterface{

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  arpSlotLogin(dto: LoginArpStudioDto) {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: dto,
      endpoint: '/login'
    }));
  }

}