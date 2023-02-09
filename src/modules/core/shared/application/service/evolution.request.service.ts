import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EvolutionRequestDto } from "../dto/evolution.request.dto";
import { EvolutionConfig } from "../../../../../config/evolution.config";
import { EvolutionApiException } from "../../domain/exception/evolutionApi.exception";

@Injectable()
export class EvolutionRequestService {
  constructor(public readonly httpService: HttpService) {
  }

  async request(evolutionRequestDTO: EvolutionRequestDto) {

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
                params: params,
              }
            );
        }

          return response;
        // if (response) {
        // }
      } catch (e) {
        if(e.response) {
          console.log(e.response.data);
          throw new EvolutionApiException('Evolution: External API Error.', e.response.data);
        }
        // console.log(e);
        // console.log(e.data);

        // if ((e instanceof EvolutionApiException)) {
        //   throw new EvolutionApiException(e.message, e.getData());
        // }
        // throw new EvolutionApiException(e.message || 'Evolution: External API Error.');
      }
  }
}
