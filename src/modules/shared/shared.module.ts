import { Module } from '@nestjs/common';
import { SHARED_TYPES } from "./application/constants/types";
import { TypeORMTransaction } from "./infrastructure/persistence/typeORM/typeORM.transaction";
import { EventEmitterDispatcher } from "./infrastructure/persistence/eventBus/eventEmitterDispatcher";
import {AsyncEventEmitterDispatcher} from "./infrastructure/persistence/eventBus/asyncEventEmitterDispatcher";

const TypeOrmTransactionInterface = { provide: SHARED_TYPES.persistence.TransactionalInterface, useClass: TypeORMTransaction };
const EventDispatcherInterface = { provide: SHARED_TYPES.eventBus.EventDispatcherInterface, useClass: EventEmitterDispatcher };
const AsyncEventDispatcherInterface = { provide: SHARED_TYPES.eventBus.AsyncEventDispatcherInterface, useClass: AsyncEventEmitterDispatcher };

@Module({
    providers: [TypeOrmTransactionInterface, TypeORMTransaction, EventDispatcherInterface,AsyncEventDispatcherInterface],
    exports: [TypeORMTransaction,TypeOrmTransactionInterface, EventDispatcherInterface,AsyncEventDispatcherInterface]
})
export class SharedModule {}
