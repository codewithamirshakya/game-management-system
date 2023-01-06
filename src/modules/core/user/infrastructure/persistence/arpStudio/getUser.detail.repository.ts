import { Inject, Injectable } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../shared/application/dto/arpStudio.request.dto";

import {
  GetUserDetailRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/getUserDetail.repository.interface";
import { DetailUserDto } from "../../../domain/dtos/request/arpStudio/detail.user.dto";

@Injectable()
export class GetUserDetailRepository implements GetUserDetailRepositoryInterface {

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  async get(data: DetailUserDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: data,
      endpoint: '/user/info'
    }));
  }
}