
import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ApiRequestService } from "../../../common/service/apiRequest.service";
import { RetreiveFailedException } from "../../exception/retrive.exception";
import { RollbackBalanceInterface } from "../../interface/arpstudio/rollbackBalance.interface";

export class EvoutionCancelBalanceService {
    constructor(

    ) { }


    async cancelBalance(dto) {
        try {
            return {
                "status":"OK",
                "balance":999.35,
                "bonus":1.00,
                "uuid":"ce186440-ed92-11e3-ac10-0800200c9a66"
            };
        } catch (e) {
            throw new RetreiveFailedException(e);
        }
    }

}