
import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { RollbackBalanceInterface } from "../../interface/arpstudio/rollbackBalance.interface";

export class RollbackBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async rollbackBalance(dto: RollbackBalanceInterface) {
        try {
            return {
                result: 0,
                desc: "OK",
                balance: 2000
            };
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

    async rollbackBalanceArpstudio(dto) {
        return await this.apiRequestService.requestApi(new ApiRequestDto({
            gameProvider: GameProviderConstant.ARP_STUDIO,
            requestDTO: new ArpStudioRequestDto({
                method: 'POST',
                params: dto,
                endpoint: 'deposit'
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