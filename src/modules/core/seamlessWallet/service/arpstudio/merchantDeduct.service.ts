
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { DeductBalanceInterface } from "../../interface/arpstudio/deductBalance.interface";

export class DeductBalanceService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async deductBalance(dto: DeductBalanceInterface) {
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