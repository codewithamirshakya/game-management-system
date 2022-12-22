import { Module } from '@nestjs/common';
import { TYPES } from "./application/constants/types";
import { TypeORMTransaction } from "./infrastructure/persistence/typeORM/typeORM.transaction";

const TypeOrmTransactionInterface = { provide: TYPES.persistence.TransactionalInterface, useClass: TypeORMTransaction };

@Module({
    providers: [TypeOrmTransactionInterface, TypeORMTransaction],
    exports: [TypeORMTransaction,TypeOrmTransactionInterface]
})
export class SharedModule {}
