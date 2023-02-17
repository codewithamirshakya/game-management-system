import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EvolutionRequestDto } from "../dto/evolution.request.dto";
import { EvolutionConfig } from "../../../../../config/evolution.config";
import { EvolutionApiException } from "../../domain/exception/evolutionApi.exception";
import { xml2js } from 'xml-js';

@Injectable()
export class EvolutionRequestService {
  constructor(public readonly httpService: HttpService) {
  }

  async request(evolutionRequestDTO: EvolutionRequestDto) {
    console.log('dto............',evolutionRequestDTO);
    const url = (evolutionRequestDTO.baseUrl ? evolutionRequestDTO.baseUrl : EvolutionConfig.baseUrl)
      + evolutionRequestDTO.endpoint;
    const params = evolutionRequestDTO.params;

      try {
          let response;
          if (evolutionRequestDTO.method === 'POST') {
            response = await this.httpService.axiosRef.post(url, JSON.stringify(params), {
              headers: {
              'Content-Type': 'application/json'
              }
            });
          } else {
            response = await this.httpService.axiosRef.get(url, {
                headers: {
                  "Authorization": "Basic "+EvolutionConfig.authorization,
                },
              }
            );
            if(this.isXML(response.data)) {
              return xml2js(response.data,{compact: true});
            }
        }
        return response.data;
      } catch (e) {
          console.log('error response',e);
        if(e.response) {
          throw new EvolutionApiException('Evolution: External API Error.', e.response.data);
        }
      }
  }

  isXML(value: string) {
    try {
    const xmlString = value.trim();
    if(xmlString.startsWith('<')) {
      return true;
    }
    return false;
    } catch (e) {
      return false;
    }

  }
}
