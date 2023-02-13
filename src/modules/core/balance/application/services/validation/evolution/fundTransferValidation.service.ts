import { Injectable } from "@nestjs/common";
import {DepositBalanceDto} from "../../../dtos/request/evolution/depositBalance.dto";
import {WithdrawBalanceDto} from "../../../dtos/request/evolution/withdrawBalance.dto";
import {GameProviderConstant} from "../../../../../shared/application/constants/gameProvider.constant";
import {IsUserExistsValidationService} from "../IsUserExistsValidation.service";
import {
    IsUserExistsValidationService as EvolutionIsUserExistsValidationService
} from "./IsUserExistsValidation.service";


@Injectable()
export class FundTransferValidationService {
    constructor(
    private userExistsValidationService: IsUserExistsValidationService,
    private evolutionUserExistsValidationService: EvolutionIsUserExistsValidationService,
    ) {}
    public async isUserExists(dto: (DepositBalanceDto | WithdrawBalanceDto)) {
        let user;
        if(dto.euID) {
            user = await this.userExistsValidationService.isUserExists(dto.euID, GameProviderConstant.EVOLUTION);
            user = user.id;
        } else {
            user = await this.evolutionUserExistsValidationService.isUserExists(dto.uID);
            user = user.userId;
        }
    }
}