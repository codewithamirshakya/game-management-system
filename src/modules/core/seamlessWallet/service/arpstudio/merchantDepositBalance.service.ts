
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { DepositBalanceInterface } from "../../interface/arpstudio/depositBalance.dtos";

export class DepositBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async depositBalance(dto: DepositBalanceInterface) {
        try {
            // const userExits = await this.arpStudioUserService.isUserExits(dto.username);
            // if (!userExits) {
            //     throw new UserNotFoundException()
            // }
            const deductDto = {
                username: dto.username,
                notifyid: dto.notify_id,
                amount: dto.amount,
                type: dto.api_type,
                serialnumber: dto.serial_number,
            }
            const serverResponse = await this.depositBalanceArpstudio(deductDto);
            return serverResponse
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

    async depositBalanceArpstudio(dto) {
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