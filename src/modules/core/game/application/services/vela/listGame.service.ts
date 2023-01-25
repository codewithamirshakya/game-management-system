import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { ListGameRepositoryInterface } from "../../../domain/repository/vela/listGame.repository.interface";

export class ListGameService {
    constructor(
      @Inject(TYPES.velaRepository.ListGameRepositoryInterface) private repo: ListGameRepositoryInterface,
    ) {}

    public getList(hostId?: string) {
        return this.repo.getList(hostId);
    }
}