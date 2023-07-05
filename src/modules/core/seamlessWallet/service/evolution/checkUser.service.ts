
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";

export class CheckUserService {
    constructor(
        @Inject(ApiRequestService) public apiRequestService: ApiRequestService,

    ) { }


    async checkUser(dto) {
        try {
            return {
                "status": "OK",
                "sid": "new-sid-to-be-used-for-api-calls-qwerty",
                "uuid": "ce186440-ed92-11e3-ac10-0800200c9a66"

            };
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }
}