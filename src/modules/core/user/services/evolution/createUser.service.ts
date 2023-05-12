import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EvolutionRequestDto } from "@src/modules/core/shared/application/dto/evolution.request.dto";
import { EvolutionConfig } from "@src/config/evolution.config";
import { AuthenticateDto } from "../../interface/evolution/authenticate.dto";
import { EvolutionAuthenticateResponse } from "../../interface/evolution/authenticateResponse.interface";
import { UserAuthenticationFailedException } from "@src/modules/core/security/domain/exception/evolution/userAuthenticationFailed.exception";
import { Request } from "express";
import { EvolutionUser } from "../../entity/createEvolutionUser.entity";
import { DataSource, Repository } from "typeorm";
import { UserAlreadyExistsException } from "../../exception/userAlreadyExists.exception";

export class EvolutionCreateUserService {
    constructor(
        @InjectRepository(EvolutionUser)
        private readonly repo: Repository<EvolutionUser>,
        private dataSource: DataSource,
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService

    ) {}

    async create(dto: AuthenticateDto,req: Request, ip: string): Promise<any> {
        try {
            const userExits= await this.repo.findOneBy({ username: dto.uuid });
            if(userExits){
                throw new UserAlreadyExistsException()
            }
            const authenticate = await this.apiRequestService.requestApi(new ApiRequestDto({
                gameProvider: GameProviderConstant.EVOLUTION,
                requestDTO: new EvolutionRequestDto({
                    method: 'POST',
                    params: dto,
                    endpoint: '/ua/v1/' + EvolutionConfig.casinoKey + '/' + EvolutionConfig.apiToken
                })
            }));
            if (authenticate){
                    const insertedData = await this.saveData(dto);
                    const response= this.makeResponseData(insertedData);
                    return response;
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

    async saveData(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const responseData = this.repo.create({
            username: data.username,
            uid:data.uid,
            currency:data.curreny,
            country:data.country,
          });
          await queryRunner.manager.save(responseData);
          await queryRunner.commitTransaction();
          return responseData;
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          await queryRunner.release();
        }
      }

      makeResponseData(data){
        return {
          username: data.username,
          currency: data.currency,
          country: data.country,
        }
      }

}