
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";

export class EvoutionWalletBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async getBalance(dto:any){
        try {
            const balance = 2000;
            return this.successResponse(balance);
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

    successResponse(balance: Number): object {
        return {
            "status":"OK",
            "balance":balance,
            "bonus":0.00,
            "uuid":"ce186440-ed92-11e3-ac10-0800200c9a66"
        }
    }
}