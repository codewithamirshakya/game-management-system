import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { ApiLog} from "./domain/apiLog.entity";
import { TYPES } from "./application/constants/types";
import { SaveRequestResponseRepository } from "./infrastructure/persistence/save.requestResponse.repository";
import { LogRequestResponseCommandHandler } from "./application/commandBus/log.requestResponse.command.handler";
const saveLog = { provide: TYPES.repository.SaveRequestResponseRepositoryInterface, useClass: SaveRequestResponseRepository };

@Module({
    imports: [TypeOrmModule.forFeature([ApiLog]),
        SharedModule],
    providers: [saveLog,LogRequestResponseCommandHandler],
})
export class ApiLogModule {}
