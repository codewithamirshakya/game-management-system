import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EvolutionRequestDto } from "src/modules/core/shared/application/dto/evolution.request.dto";
import { EvolutionConfig } from "src/config/evolution.config";
import { AuthenticateDto } from "../../interface/evolution/authenticate.dto";
import { EvolutionAuthenticateResponse } from "../../interface/evolution/authenticateResponse.interface";
import { UserAuthenticationFailedException } from "src/modules/core/security/domain/exception/evolution/userAuthenticationFailed.exception";
import { Request } from "express";

export class EvolutionCreateUserService {
    @Inject(ApiRequestService)
    public apiRequestService: ApiRequestService

    async create(dto: AuthenticateDto,req: Request, ip: string): Promise<any> {
        try {
            const authenticate = await this.apiRequestService.requestApi(new ApiRequestDto({
                gameProvider: GameProviderConstant.EVOLUTION,
                requestDTO: new EvolutionRequestDto({
                    method: 'POST',
                    params: dto,
                    endpoint: '/ua/v1/' + EvolutionConfig.casinoKey + '/' + EvolutionConfig.apiToken
                })
            }));
            if (authenticate){

            }

            const userRequestDto = {
                cCode: 'GUI',
                ecID: EvolutionConfig.casinoKey + EvolutionConfig.apiToken,
                euID: dto.player.id,
                output: 1,
            };
            const userDetail = await this.apiRequestService.requestApi(new ApiRequestDto({
                gameProvider: GameProviderConstant.EVOLUTION,
                requestDTO: new EvolutionRequestDto({
                    method: 'GET',
                    params: userRequestDto,
                    endpoint: '/api/ecashier'
                })
            }));

            return userDetail;

            //   return new EvolutionAuthenticateResponse({
            //     countryCode: userDetail.userdetails.countrycode._text,
            //     uid: userDetail.userdetails.uid._text,
            //     authenticateResponse: authenticate
            //   });
        } catch (e) {
            throw new UserAuthenticationFailedException(e);
        }
    }

}