
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { ArpstudioGetBalanceInterface } from "../../interface/arpstudio/getbalance.interface";

export class ArpStudioWallletBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async getBalance(dto: ArpstudioGetBalanceInterface) {
        try {

            const balance = 2000;
            console.log(balance);
            return this.successResponse(balance);
            
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

    successResponse(balance: Number): object {
        return {
            result: 0,
            desc: "OK",
            balance: balance
        }
    }
}