import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { ListGameLobbyDto } from "../../dtos/request/arpStudio/listGameLobby.dto";
import {
    ListGameLobbyRepositoryInterface
} from "../../../domain/repository/arpStudio/listGameLobby.repository.interface";

export class ListGameLobbyService {
    constructor(
      @Inject(TYPES.repository.ListGameLobbyRepositoryInterface) private repo: ListGameLobbyRepositoryInterface,
    ) {}

    public getList(dto: ListGameLobbyDto) {
        return this.repo.getList(dto);
    }
}