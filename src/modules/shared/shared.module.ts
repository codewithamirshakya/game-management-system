import { Module } from '@nestjs/common';
import { SHARED_TYPES } from "./application/constants/types";
import { TypeORMTransaction } from "./infrastructure/persistence/typeORM/typeORM.transaction";
import { EventEmitterDispatcher } from "./infrastructure/persistence/eventBus/eventEmitterDispatcher";

const TypeOrmTransactionInterface = { provide: SHARED_TYPES.persistence.TransactionalInterface, useClass: TypeORMTransaction };
const EventDispatcherInterface = { provide: SHARED_TYPES.eventBus.EventDispatcherInterface, useClass: EventEmitterDispatcher };

@Module({
    providers: [TypeOrmTransactionInterface, TypeORMTransaction, EventDispatcherInterface],
    exports: [TypeORMTransaction,TypeOrmTransactionInterface, EventDispatcherInterface]
})
export class SharedModule {}
