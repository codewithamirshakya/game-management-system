import {Inject, Injectable} from "@nestjs/common";
import {DepositBalanceDto} from "../../../dtos/request/evolution/depositBalance.dto";
import {WithdrawBalanceDto} from "../../../dtos/request/evolution/withdrawBalance.dto";
import {GameProviderConstant} from "../../../../../shared/application/constants/gameProvider.constant";
import {IsUserExistsValidationService} from "../IsUserExistsValidation.service";
import {
    IsUserExistsValidationService as EvolutionIsUserExistsValidationService
} from "./IsUserExistsValidation.service";
import {TYPES} from "../../../constants/types";
import {
    IseTransIdUniqueRepositoryInterface
} from "../../../../domain/repository/evolution/iseTransIdUnique.repository.interface";
import {ETransIdAlreadyExistsException} from "../../../../domain/exception/eTransIdAlreadyExists.exception";


@Injectable()
export class FundTransferValidationService {
    constructor(
    private userExistsValidationService: IsUserExistsValidationService,
    private evolutionUserExistsValidationService: EvolutionIsUserExistsValidationService,
    @Inject(TYPES.evolutionRepository.IseTransIdUniqueRepositoryInterface) private repo: IseTransIdUniqueRepositoryInterface,
    ) {}

    public async validate(dto: (DepositBalanceDto | WithdrawBalanceDto)) : Promise<number> {
        let userId;
        if(dto.euID) {
            const user = await this.userExistsValidationService.isUserExists(dto.euID, GameProviderConstant.EVOLUTION);
            userId = user.id;
        } else {
            const user = await this.evolutionUserExistsValidationService.isUserExists(dto.uID);
            userId = user.userId;
        }

        const isUnique = await this.repo.isUnique(dto.eTransID);
        if(!isUnique) {
            throw new ETransIdAlreadyExistsException();
        }
        return userId;
    }
}