
import { Inject } from "@nestjs/common";
import { Request } from "express";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ArpStudioCreateUserService } from "@src/modules/core/user/services/arpstudio/createUser.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ArpstudioGetBalanceInterface } from "../../interface/arpstudio/getbalance.interface";
import { RetreiveFailedException } from "../../exception/retrive.exception";

export class ArpStudioWallletBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async getBalance(dto: ArpstudioGetBalanceInterface) {
        try {
            // const userExits = await this.arpStudioUserService.isUserExits(dto.username);
            // if (!userExits) {
            //     throw new UserNotFoundException()
            // }
            const testDto={
                username:dto.username,
                notifyid:dto.notify_id,
            }
            const serverResponse = await this.getBalanceArpStudio(testDto);
            return serverResponse
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

    async getBalanceArpStudio(dto) {
        return await this.apiRequestService.requestApi(new ApiRequestDto({
            gameProvider: GameProviderConstant.ARP_STUDIO,
            requestDTO: new ArpStudioRequestDto({
                method: 'POST',
                params: dto,
                endpoint: 'balance'
            })
        }));
    }

    makeResponseData(data, username) {
        return {
            username: data.username ? data.username : username,
            amount: data.totalAmount ? data.totalAmount : 0,
            withdraw_balance: data.withDrawBalane ? data.withDrawBalane : 0,
            available_balance: (data.totalAmount) - (data.withDrawBalane),

        }
    }
}