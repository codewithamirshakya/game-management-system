
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { DepositBalanceInterface } from "../../interface/arpstudio/depositBalance.dtos";

export class DepositBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async depositBalance(dto: DepositBalanceInterface) {
        try {
            
            return {
                result: 0,
                desc: "OK",
                balance: 2000,
                orderno: "1002344"
            };
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }
}