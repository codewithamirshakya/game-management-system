import { HttpService } from '@nestjs/axios';
import { ArpStudioRequestDto } from '../dto/arpStudio.request.dto';
import { arpStudioConfig } from '../../../../../config/arpStudio.config';
import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { ExternalApiException } from "../../domain/exception/externalApi.exception";

@Injectable()
export class ArpStudioRequestService {
  constructor(public readonly httpService: HttpService) {}

  async request(arpStudioRequestDTO: ArpStudioRequestDto) {
    delete arpStudioRequestDTO.params.gameProvider;
    const url = arpStudioConfig.baseUrl + arpStudioRequestDTO.endpoint;
    const sign = this.buildSign({...arpStudioRequestDTO.params,appid: arpStudioConfig.appid});
    const params = new URLSearchParams({
        appid: arpStudioConfig.appid,
        ...arpStudioRequestDTO.params,
        sign: sign,
      }).toString();

    //handle post request for arpStudio
    if (arpStudioRequestDTO.method === 'POST') {
      try {
        const response = await this.httpService.axiosRef.post(url, params);
        if(response.data.result >=0) {
          return response.data;
        }
        throw new ExternalApiException('External API Error.', response.data);
      } catch (e) {
        if((e instanceof ExternalApiException)) {
          throw new ExternalApiException(e.message, e.getData());
        }
        throw new ExternalApiException(e.message || 'External API Error.');
      }
      // if GET METHOD
    } else {
      try {
        console.log('final--',url+'?'+params);
        const response = await this.httpService.axiosRef.get(url+'?'+params);
        if(response.data.result >=0) {
          return response.data;
        }
        throw new ExternalApiException('External API Error.', response.data);
      } catch (e) {
        if((e instanceof ExternalApiException)) {
          throw new ExternalApiException(e.message, e.getData());
        }
        throw new ExternalApiException(e.message || 'External API Error.');
      }
    }
  }

  private buildSign(params: any) {
    const sortObj = this.sortObjectProps(params);
    let buildSign = new URLSearchParams(sortObj).toString();
    buildSign = buildSign + '&key=' + arpStudioConfig.appKey;
    return createHash('md5').update(buildSign).digest('hex');
  }

  //sort object property based on ASCII
  private sortObjectProps = (o) =>
    Object.keys(o)
      .sort()
      .reduce((r, k) => ((r[k] = o[k]), r), {});
}
