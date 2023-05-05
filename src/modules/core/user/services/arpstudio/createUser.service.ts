import { ApiRequestService } from "src/modules/core/shared/application/service/apiRequest.service";
import { createUserArpStudio } from "../../interface/arpStudioCreateUser.interface";
import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "src/modules/core/shared/application/constants/gameProvider.constant";
import { ApiRequestDto } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "src/modules/core/shared/application/dto/arpStudio.request.dto";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { ArpStudioUser } from "../../entity/createArpStudio.entity";
import { DataSource, Repository} from 'typeorm';
import { UserCreationFailedException } from "../../exception/userCreationFailed.exception";

export class ArpStudioCreateUserService {
    constructor(
        @InjectRepository(ArpStudioUser)
        private readonly repo: Repository<ArpStudioUser>,
        private dataSource: DataSource,
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService

    ) {}

    async create(dto: createUserArpStudio, req: Request, ip: string) {
        try {

            const serverResponse = await this.createUserArpStudio(dto);
            if (serverResponse) {
                const userExits = await this.repo.findOneBy({ username: dto.username });
                if(!userExits){
                    const insertedData = await this.saveData(dto);
                    const response= this.makeResponseData(insertedData,serverResponse);
                    return response;

                }
                const response= this.makeResponseData(userExits,serverResponse);
                return response;
            }
        } catch (e) {
            throw new UserCreationFailedException(e);
        }
    }

    async createUserArpStudio(dto: createUserArpStudio){
      return await this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.ARP_STUDIO,
        requestDTO: new ArpStudioRequestDto({
          method: 'POST',
          params: dto,
          endpoint: 'login'
        })
      }));
    }

    async saveData(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const responseData = this.repo.create({
            username: data.username,
            nickname:data.nickname,
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

      makeResponseData(data,serverResponse){
        return {
          username: data.username,
          nickname: data.nickname,
          openurl: serverResponse.openurl
        }
      }

  }