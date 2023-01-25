import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { VelaRequestDto } from "../dto/vela.request.dto";
import { VelaGamingConfig } from "../../../../../config/velaGaming.config";
import { VelaApiException } from "../../domain/exception/velaApi.exception";

@Injectable()
export class VelaGamingRequestService {
  constructor(public readonly httpService: HttpService) {}

  async request(velaRequestDTO: VelaRequestDto) {

    const url = VelaGamingConfig.baseUrl + velaRequestDTO.endpoint;
    const params = new URLSearchParams({
        ...velaRequestDTO.params,
        host_id: velaRequestDTO.params.hostId
          ? velaRequestDTO.params.hostId
          : VelaGamingConfig.operatorId,
        currency: velaRequestDTO.params.currency ? velaRequestDTO.params.currency : VelaGamingConfig.currency,
      }).toString();

    //handle get request only
      try {
        const response = await this.httpService.axiosRef.get(url+'?'+params,{
          headers: {
            "Accept-Encoding": "*",
          }
        });
        if(response.data.data && response.data.data.status_code == 0) {
          return response.data.data;
        }
        throw new VelaApiException('Vela API Error.', response.data);
      } catch (e) {
        if((e instanceof VelaApiException)) {
          throw new VelaApiException(e.message, e.getData());
        }
        throw new VelaApiException(e.message || 'External API Error.');
      }
  }
}
