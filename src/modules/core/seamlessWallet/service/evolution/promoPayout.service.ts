
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";

export class PromoPayoutService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async promoPayout(dto) {
        try {
            return {
                "status":"OK",
                "balance":999.36,
                "bonus":1.00,
                "uuid":"ce186440-ed92-11e3-ac10-0800200c9a66"
              };
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }
}