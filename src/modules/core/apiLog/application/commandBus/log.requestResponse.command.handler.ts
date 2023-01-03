import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LogRequestResponseCommand } from "../../../shared/domain/command/log/log.requestResponse.command";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import {
  SaveRequestResponseRepositoryInterface
} from "../../domain/repository/save.requestResponse.repository.interface";
import { SaveApiLogDto } from "../../domain/dto/saveApiLog.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

@CommandHandler(LogRequestResponseCommand)
export class LogRequestResponseCommandHandler implements ICommandHandler<LogRequestResponseCommand>{

  constructor(
    @Inject(TYPES.repository.SaveRequestResponseRepositoryInterface) private repo: SaveRequestResponseRepositoryInterface,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  execute(command: LogRequestResponseCommand): Promise<any> {
    return this.repo.save(new SaveApiLogDto(
      command.url,
      command.requestData,
      command.response
    ));
  }

}