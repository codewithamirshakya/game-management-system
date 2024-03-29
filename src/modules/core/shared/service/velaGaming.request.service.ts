import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { VelaRequestDto } from "../dto/vela.request.dto";
import { VelaGamingConfig } from "../../../../config/velaGaming.config";
import { VelaApiException } from "../exception/velaApi.exception"

@Injectable()
export class VelaGamingRequestService {
  constructor(public readonly httpService: HttpService) {}

  async request(velaRequestDTO: VelaRequestDto) {

    const url = (velaRequestDTO.baseUrl ? velaRequestDTO.baseUrl : VelaGamingConfig.baseUrl)
      + velaRequestDTO.endpoint;
    const params = {
        ...velaRequestDTO.params,
        host_id: velaRequestDTO.params.hostId
          ? velaRequestDTO.params.hostId
          : VelaGamingConfig.operatorId,
        // currency: velaRequestDTO.params.currency ? velaRequestDTO.params.currency : VelaGamingConfig.currency,
      };

    //handle get request only
      try {
        const response = await this.httpService.axiosRef.get(url,{
          headers: {
            "Accept-Encoding": "*",
          },
          params: params,
          }
        );
        if(response.data.data && response.data.data.status_code == 0) {
          return response.data.data;
        }
        throw new VelaApiException('Vela: External API Error.', response.data);
      } catch (e) {
        if((e instanceof VelaApiException)) {
          throw new VelaApiException(e.message, e.getData());
        }
        throw new VelaApiException(e.message || 'Vela: External API Error.');
      }
  }
}
