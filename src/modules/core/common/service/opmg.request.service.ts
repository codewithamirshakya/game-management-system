import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OpmgException } from "../exception/opmgApi.exception"
import { OpmgDto } from '../dto/opmg.request.dto';
import { opmgConfig } from '../../../../config/opmg.config';

@Injectable()
export class OpmgRequestService {
  constructor(public readonly httpService: HttpService) {}

  async request(opmgRequestDTO: OpmgDto) {

    const url = opmgConfig.baseUrl + opmgRequestDTO.endpoint;
      try {
        const response = await this.httpService.axiosRef.get(url,{
          params: opmgRequestDTO.params,
          }
        );
        if(response && response.status == 200) {
          return response.data;
        }
        throw new OpmgException('Opmg: External API Error.', response.data);
      } catch (e) {
        if((e instanceof OpmgException)) {
          throw new OpmgException(e.message, e.getData());
        }
        throw new OpmgException(e.message || 'Opmg: External API Error.');
      }
  }
}
